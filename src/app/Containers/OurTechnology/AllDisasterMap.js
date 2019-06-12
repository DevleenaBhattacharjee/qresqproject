import React from "react";
import ReactDOM from "react-dom";
import { loadModules } from 'esri-loader';
import { AffectedAreaMap } from '../OurProducts/AffectedAreaMap';


const options = {
    url: 'https://js.arcgis.com/4.8/'
    //url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
};

var disasterDataloc =[];
var disasterDataRecord={};
var llatitude = 0;
var llongitude = 0;  
var mapcolor = "";
var actionFlag = false;
var self;
const styles =  {
    AllDisasterMapDiv: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '120%'
    },
}

export class AllDisasterMap extends React.Component{
    constructor(props) {
        super(props);
        self=this;
        this.mymapref = React.createRef()
        this.state = {
            llongitude: 0,
            llatitude: 0,
            lmapcolor: '',
            disasterData: [],
            disasterDataRecord: {}  
          };
          
    }  
   
    componentDidUpdate(){
        console.log("entering componentDidUpdate ALLDISASTERMAP"); 
        
        loadModules([   'esri/Map', 
                                'esri/views/MapView',
                                "esri/WebMap",
                                "esri/Graphic",
                                "esri/geometry",
                                "dojo/on",
                                "esri/layers/FeatureLayer"], 
                                options)
        .then(([Map, 
                MapView,
                FeatureLayer]) => {
            
        var url = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
        
        var featureLayer = new FeatureLayer({
                            url: url
        });
        
        const map = new Map({ 
            basemap: "dark-gray-vector"
            ,spacialReference: featureLayer.spacialReference
        });
        
        // Create the MapView
        const view = new MapView({
            container: "AllDisasterViewDiv",
            map: map,
            zoom: 2,
            center: {
                x: 38.9637,
                y: 35.2433
            }
            ,spacialReference: featureLayer.spacialReference
        });
            
        //Plot the markers on the map
        this.props.disasterData.map(itemDisaster => 
        {
                        
            if(itemDisaster.disasterType === 'EQ'){
                mapcolor = "#ffc802";        
            }
            else if(itemDisaster.disasterType === 'FL'){ 
                mapcolor = "#012cff";                  
            }
            else if( itemDisaster.disasterType === 'TC' ){ 
                mapcolor = "#f74100";
            } 
            else if(itemDisaster.disasterType === 'HU'){
                mapcolor = "#03b52f"; 
            } 
                view.graphics.add({
                 
                    symbol: {
                        type: "simple-marker",
                        style: "circle",
                        color: mapcolor,
                        text: "\ue61d", // esri-icon-map-pin
                        font: {
                            size: 15,
                            family: "CalciteWebCoreIcons"
                        }       
                    },
                    geometry: {
                        type: "point",
                        longitude: Number(itemDisaster.geoPoints.lon),
                        latitude: Number(itemDisaster.geoPoints.lat)
                    }

                });  
        }); // disasterData.map 

        disasterDataloc = this.props.disasterData;
        console.log("before immediate click ALLDISASTERMAP");
        //Onclick on the marker find the coordinates
        view.on("immediate-click", function (event) {    
            console.log("inside immediate click ALLDISASTERMAP");
            view.hitTest(event).then( function(response) {
                llongitude = Number(response.screenPoint.mapPoint.longitude);
                llatitude = Number(response.screenPoint.mapPoint.latitude);
                console.log("screen point","llongitude: ",llongitude,"llatitude: ",llatitude );
               
                var plon = Number(llongitude);
                var plat = Number(llatitude);
                plon = Math.round(plon * 100) / 100
                plat = Math.round(plat * 100) / 100
                var pr = 1;
                var llat,llon;
                           
                //find the closest latitude and longitude
                disasterDataloc.map(itemDisaster => 
                {
                    llat = Number(itemDisaster.geoPoints.lat);
                    llon = Number(itemDisaster.geoPoints.lon)
                    var xlon = plon - llon;
                    var xlat = plat - llat;
                    if (((xlon*xlon) + (xlat*xlat))<(pr*pr)) 
                    {                        
                    
                        if(itemDisaster.disasterType === 'EQ'){
                            mapcolor = "#ffc802";        
                        }else if(itemDisaster.disasterType === 'FL'){ 
                            mapcolor = "#012cff";                  
                        }else if( itemDisaster.disasterType === 'TC' ){ 
                            mapcolor = "#f74100";
                        }else if(itemDisaster.disasterType ==='HU'){
                            mapcolor = "#03b52f"; 
                        } 
                        disasterDataRecord = itemDisaster;
                        actionFlag = true;
                        llongitude = Number(itemDisaster.geoPoints.lon);
                        llatitude = Number(itemDisaster.geoPoints.lat);
                        console.log("disaster array points","llongitude: ",llongitude,"llatitude: ",llatitude );
                        console.log("plon",plon,"plat",plat,"llon",llon,"llat",llat,"xlon",xlon, "xlat", xlat); 
                        console.log("((xlon*xlon) + (xlat*xlat)):",((xlon*xlon) + (xlat*xlat)), "<  (pr*pr)", (pr*pr));
                        console.log("FOUND!!!!!");     
                    }
                });                                
                var opts = {
                    duration: 2000, 
                    easing: "linear "  // Duration of animation will be 5 seconds
                };
                            
                view.goTo({
                    zoom: view.zoom + 3,
                    center: [llongitude,
                             llatitude]
                          },opts);
                
                window.addEventListener("mouseup",function(event)
                {  
                    ReactDOM.render(
                        <AffectedAreaMap  glatitude={llatitude} 
                                        glongitude={llongitude} 
                                        mapcolor ={mapcolor}
                                        disasterDataRecord={disasterDataRecord}
                                        />
                                        ,document.getElementById('AllDisasterViewDiv'));
                    
                });
            });//hitTest
            console.log("after hittest ALLDISASTERMAP");
        }); //view.on
        console.log("after view.on ALLDISASTERMAP"); 
        }); //then
        console.log("leaving componentDidUpdate ALLDISASTERMAP"); 
    } 
    renderMap() 
    {   
        console.log("rendermap ALLDISASTERMAP"); 
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap
    render() 
    {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@"); 
        console.log("render ALLDISASTERMAP"); 
        return(
            <div id='AllDisasterViewDiv' style={ styles.AllDisasterMapDiv} >
                {this.renderMap()}
            </div>       
        );  
    }//render 
}//class
    
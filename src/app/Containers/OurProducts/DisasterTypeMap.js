import React from "react";
import ReactDOM from "react-dom";
import { loadModules } from 'esri-loader';
import { AffectedAreaMap } from './AffectedAreaMap';


const options = {
    url: 'https://js.arcgis.com/4.8/'
    //url: 'https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2'
};

var gDisasterDataArray =[];
var gSingleDisasterTypeDataRecord={};
var gLatitude = 0;
var gLongitude = 0;  
var gMapcolor = "";
var actionFlag = false;
var self;

const styles =  {
    DisasterTypeMapDiv: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '120%'
    },
}

export class DisasterTypeMap extends React.Component{
    constructor(props) {
        super(props);
        self=this;
        this.state = {
            sLongitude: 0,
            sLatitude: 0,
            sMapcolor: '',
            sAllDisasterTypeData: [],
            sAllDisasterTypeDataFlag: false,
            sSingleDisasterTypeDataRecord: {}  
          };
          
    }  
    componentDidMount() {
        console.log("@@@@@@@@@@@entering componentDidMount DISASTERTYPE"); 
       // if(!this.props.ButtonClickFlag){
            this.fetchAllDisasterTypeData();
       // }
        
    }
   
    fetchAllDisasterTypeData() { 
        const lEndPoint = "http://167.86.104.221:8050/api/qresq/search";
            try 
            {
                fetch(lEndPoint,{
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            method: "POST",
                            body: JSON.stringify({size: 2000, indexName: 'test_alert'
                            //,filters: this.props.DisasterTypeFilter  
                        })
            
                })
                .then(response => response.json()) 
                .then(json => {
                    this.setState({
                        sAllDisasterTypeData: json.results,
                        sAllDisasterTypeDataFlag: true
                    })  
                    console.log("@@@@@@@@@@@I am in fetchAllDisasterTypeData in DISASTERTYPE",JSON.stringify(json));
                    if(this.state.sAllDisasterTypeDataFlag){
                        gDisasterDataArray = this.state.sAllDisasterTypeData;
                    }
 
                })
                .catch(error =>{
                  console.log("ERROR" + error);     
                })
          
            } 
            catch (error) {
                console.log(error);
            }
    }

    componentDidUpdate(){
        console.log("@@@@@@@@@@@entering componentDidUpdate DISASTERTYPE"); 
        
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
            
        var lURL = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
        
        var featureLayer = new FeatureLayer({
                            url: lURL
        });
        
        const map = new Map({ 
            //basemap:  "dark-gray"
            basemap: "dark-gray-vector"
            ,spacialReference: featureLayer.spacialReference
        });
        
        // Create the MapView
        const view = new MapView({
            container: "DisasterTypeView",
            map: map,
            zoom: 2,
            center: {
                x: 38.9637,
                y: 35.2433
            }
            ,spacialReference: featureLayer.spacialReference
        });
                  
        if(this.props.ButtonClickFlag){
           console.log("@@@@@@@@@@@if(this.props.ButtonClickFlag)", this.props.ButtonClickFlag);
           gDisasterDataArray = this.props.SpecificDisasterTypeData;
            //this.props.ButtonClickFlag = false;
       }
        
        //Plot the markers on the map
        gDisasterDataArray.map(itemDisaster => 
        {
                    
            if(itemDisaster.disasterType === 'EQ'){
                gMapcolor = "#ffc802";        
            }
            else if(itemDisaster.disasterType === 'FL'){ 
                gMapcolor = "#012cff";                  
            }
            else if( itemDisaster.disasterType === 'TC' ){ 
                gMapcolor = "#f74100";
            } 
            else if(itemDisaster.disasterType === 'HU'){
                gMapcolor = "#03b52f"; 
            } 

            view.graphics.add({
                   symbol: {
                        type: "simple-marker",
                        style: "circle",
                        color: gMapcolor,
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
            }); //view.graphics.add   
        }); // gDisasterDataArray.map 


        //Onclick on the marker find the coordinates
        view.on("immediate-click", function (event) {    
            view.hitTest(event).then( function(response) {
                gLongitude = Number(response.screenPoint.mapPoint.longitude);
                gLatitude = Number(response.screenPoint.mapPoint.latitude);
                console.log("@@@@@@@@@@@screen point","gLongitude: ",gLongitude,"gLatitude: ",gLatitude );
               
                var plon = Number(gLongitude);
                var plat = Number(gLatitude);
                plon = Math.round(plon * 100) / 100
                plat = Math.round(plat * 100) / 100
                var pr = 1;
                var llat,llon;
                           
                //find the closest latitude and longitude
                gDisasterDataArray.map(itemDisaster => 
                {
                    llat = Number(itemDisaster.geoPoints.lat);
                    llon = Number(itemDisaster.geoPoints.lon)
                    var xlon = plon - llon;
                    var xlat = plat - llat;
                    if (((xlon*xlon) + (xlat*xlat))<(pr*pr)) 
                    {                        
                    
                        if(itemDisaster.disasterType === 'EQ'){
                            gMapcolor = "#ffc802";  
                            //self.state.sMapcolor = "#ffc802";       
                        }else if(itemDisaster.disasterType === 'FL'){ 
                            gMapcolor = "#012cff";   
                            //self.state.sMapcolor = "#012cff";                   
                        }else if( itemDisaster.disasterType === 'TC' ){ 
                            gMapcolor = "#f74100";
                            //self.state.sMapcolor = "#f74100";    
                        }else if(itemDisaster.disasterType ==='HU'){
                            gMapcolor = "#03b52f"; 
                            //self.state.sMapcolor = "#03b52f";    
                        } 
                        gSingleDisasterTypeDataRecord = itemDisaster;
                        gLongitude = Number(itemDisaster.geoPoints.lon);
                        gLatitude = Number(itemDisaster.geoPoints.lat);

                        // self.state.sSingleDisasterTypeDataRecord = itemDisaster;
                        // self.state.sLongitude = Number(itemDisaster.geoPoints.lon);
                        // self.state.sLatitude = Number(itemDisaster.geoPoints.lat);

                        //console.log("global variable",gSingleDisasterTypeDataRecord,gLongitude,gLatitude);
                       // console.log("state variable",self.state.sSingleDisasterTypeDataRecord,self.state.sLongitude,self.state.sLatitude);
                        
                        console.log("@@@@@@@@@@@after the finding the closest to screen points","gLongitude: ",gLongitude,"gLatitude: ",gLatitude );
                        console.log("@@@@@@@@@@@Number(itemDisaster.geoPoints.lon)",Number(itemDisaster.geoPoints.lon),"Number(itemDisaster.geoPoints.lat)", Number(itemDisaster.geoPoints.lat));   
                    }
                });                                
                var opts = {
                    duration: 2000, 
                    easing: "linear "  // Duration of animation will be 5 seconds
                };
                            
                view.goTo({
                    zoom: view.zoom + 3,
                    center: [
                                gLongitude,
                                gLatitude
                                // self.state.sLongitude,
                                // self.state.sLatitude 
                            ]
                          },opts);
                
                window.addEventListener("mouseup",function(event)
                {  
                    ReactDOM.render(
                        <AffectedAreaMap    
                                            latitude={gLatitude} 
                                            longitude={gLongitude} 
                                            mapcolor ={gMapcolor}
                                            SingleDisasterDataRecord={gSingleDisasterTypeDataRecord}
                                            //   latitude={self.state.sLatitude} 
                                            //   longitude={self.state.sLongitude} 
                                            //    mapcolor ={self.state.sMapcolor}
                                            //    SingleDisasterDataRecord={self.state.sSingleDisasterTypeDataRecord}
                                            />
                                            ,document.getElementById('DisasterTypeView'));
                    
                });
            });//hitTest
        }); //view.on
        }); //then
    } 
    // componentWillUnmount()
    // {
    //     console.log("!!!!!!!!!!!!!!!!!@@@@@@@@@@@i am in componentWillUnmount DISASTERTYPE");
    //     ReactDOM.unmountComponentAtNode(document.getElementById('DisasterTypeView')); 
    // }
  
    renderMap() 
    {   
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap

    render() 
    {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@render DISASTERTYPE"); 
        return(
            <div id='DisasterTypeView' style={ styles.DisasterTypeMapDiv }>
                {this.renderMap()}
            </div>       
        );  
    }//render 
}//class
    
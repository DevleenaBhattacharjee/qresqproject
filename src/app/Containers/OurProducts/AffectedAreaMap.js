import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import {ButtonToolbar, Button } from 'react-bootstrap';
import { loadModules } from 'esri-loader';
import {FullSummaryReport} from './FullSummaryReport';
import {SocialMediaSector} from './SocialMediaSector';
import { DetailDisasterReport } from './DetailDisasterReport';
import "./AffectedAreaMap.css";
import "./FullSummaryReport.css";


const options = {
    url: 'https://js.arcgis.com/4.8/'
};
const styles =  {
    AffectedMapContainer: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '120%'
    },
    AffectedMapDiv: {
        margin: 0,
        padding: 0,
        height: '100%',
        width: '120%'
    } 
}

export class AffectedAreaMap extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sFullSummeryFlag: false,
            sSocialMediaFlag: false,
            sDetailDisasterReportData: [],
            sDetailDisasterReportDataflag: false
        }
    }
    componentDidMount() 
    {  
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%entering componentDidMount AFFECTEDAREAMAP");
        this.fetchDetailDisasterReport();
    }
    fetchDetailDisasterReport() 
    {  
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%entering fetchDetailDisasterReport AFFECTEDAREAMAP");
        const endPoint = "http://167.86.104.221:8050/api/qresq/search";
        fetch(endPoint,{
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        exactMatch : true,
                        filters: [
                                    {
                                        fieldName: "disasterType",
                                        value: "TC"
                                        //value: this.props.SingleDisasterDataRecord.disasterType
                                    },
                                    {
                                        distance : "100",
                                        fieldName: "geolocation",
                                        type : "GEO_DISTANCE",
                                        value: "19.8, 85.82"
                                        //value: this.props.latitude+","+this.props.longitude,
                                    }
                        ],
                        from: 0,
                        indexName: "test_summary",
                        size: 30 
                    })
                })
                .then(response => response.json()) 
                .then(json => {
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%% sDetailDisasterReportData",json.results);
                    this.setState({
                        sDetailDisasterReportData: json.results,
                        sDetailDisasterReportDataflag: true
                    }) 
                
                })
                .catch(error =>{
                console.log("ERROR" + error);     
                })                
    }

    componentDidUpdate(){
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%entering componentDidUpdate AFFECTEDAREAMAP");
        loadModules([   'esri/Map', 
                        'esri/views/MapView',
                        "esri/WebMap",
                        "esri/Graphic",
                        "esri/geometry",
                        "esri/layers/FeatureLayer"], 
                        options)
        .then(([    Map, 
                    MapView, 
                    FeatureLayer]) => {

            var url = "https://www.arcgis.com/apps/Embed/index.html?webmap=de6c0622b7944b48a3a80c997d6835f2";
            var featureLayer = new FeatureLayer({
                url: url
            });
            const map = new Map({ 
                basemap:  "dark-gray"
                ,spacialReference: featureLayer.spacialReference
            });
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%this.props.longitude",this.props.longitude, 
            "this.props.latitude", this.props.latitude,"this.props.mapcolor", this.props.mapcolor);
                
            // Create the MapView
            const view = new MapView({
                container: "AffectedMapView",
                map: map,
                zoom: 6,
                center: [this.props.longitude, this.props.latitude]
                ,spacialReference: featureLayer.spacialReference
            });
            view.graphics.add({
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: this.props.mapcolor,
                    text: "\ue61d", // esri-icon-map-pin
                    font: {
                        size: 15,
                        family: "CalciteWebCoreIcons"
                    }       
                },
                geometry: {
                    type: "point",
                    longitude: this.props.longitude,
                    latitude: this.props.latitude
                }
            });       
        });     
    }

    // componentWillUnmount()
    // {
    //     console.log("!!!!!!!!!!!!!!!!!%%%%%%%%%%%%%%%%%%%%%%%%%%%i in componentWillUnmount AFFECTEDAREAMAP");
    //     ReactDOM.unmountComponentAtNode(document.getElementById('AffectedMapView')); 
    // }

    renderMap() {    
        if(this.state.status === 'loading') {
            return <div>loading</div>;
        }
    }//renderMap

    renderButton()
    {
        return(
            <div id="btnDiv" className="panel-summery-button">
                <ButtonToolbar className="summary-button-group"
                                    onClick={this.handleSubmitButtonClick.bind(this)}>
                    <Button className="full-summary-button" type="submit" id="fullsummary">SEE FULL SUMMARY</Button>
                    <Button className="social_media_button" type="submit" id="socialmedia">SEE SOCIAL MEDIA</Button>    
                </ButtonToolbar>
            </div>
        )
    }
    handleSubmitButtonClick(e){
        //this.forceUpdate();
        this.setState({sDetailDisasterReportDataflag: false});
        if(e.target.id === "fullsummary")
        {
            this.setState({sFullSummeryFlag: true,
                           sSocialMediaFlag: false}); 
        }
        if(e.target.id === "socialmedia")
        {
            this.setState({sSocialMediaFlag: true,
                           sFullSummeryFlag: false});  
        }
        
    }

    render() {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%render AFFECTEDAREAMAP");
        return( 
            <div  id="AffectedMapContainer" style={styles.AffectedMapContainer} > 
                {!this.state.sFullSummeryFlag  
                //|| !this.state.socialMediaFlag
                &&
                    <div id='AffectedMapView' style={ styles.AffectedMapDiv } >
                        {this.renderMap()}
                    </div>
                } 
                { this.state.sDetailDisasterReportDataflag &&
                    <DetailDisasterReport  
                        //SingleDisasterDataRecord={this.props.SingleDisasterDataRecord} 
                        mapcolor={this.props.mapcolor}
                        DetailDisasterReportData={this.state.sDetailDisasterReportData}/> 
                }
                { this.state.socialMediaFlag &&
                    <SocialMediaSector 
                        SingleDisasterDataRecord={this.props.SingleDisasterDataRecord}
                        latitude={this.props.latitude} 
                        longitude={this.props.longitude}
                        mapcolor={this.props.mapcolor}/>               
                } 
                { this.state.fullSummeryFlag && 
                    <FullSummaryReport 
                        //SingleDisasterDataRecord={this.props.SingleDisasterDataRecord}
                        //latitude={this.props.latitude} 
                        //longitude={this.props.longitude}
                        //mapcolor={this.props.mapcolor}
                    />           
                }  
                {this.renderButton()}   
            </div>  
        ) //return
    }//render
}//class

export default AffectedAreaMap;
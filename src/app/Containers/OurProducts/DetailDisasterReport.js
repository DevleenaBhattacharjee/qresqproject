import React, { Component, useLayoutEffect } from 'react';
import "./DetailDisasterReport.css";

export class DetailDisasterReport extends React.Component{
    constructor(props) {
        super(props);
    }
    // componentWillUnmount()
    // {
    //     console.log("!!!!!!!!!!!!!!!!!(((((((((((((((((((( in componentWillUnmount DetailDisasterReport");
    //     ReactDOM.unmountComponentAtNode(document.getElementById('DetailDisasterDiv')); 
    // }
    render()
    {
        var mapcolor = this.props.mapcolor;
        var summary = this.props.DetailDisasterReportData[0].summary;
        console.log("((((((((((((((((((((DetailDisasterReport Render",mapcolor);
        
        return( 
                //<label className="panel-label-header">SUMMARY</label> <br/> 
                // <label className="panel-label-header">DATE OF REPORT</label> <br/> 
                    <div id ="DetailDisasterDiv" className="panel"> 
                        <div className="panel-right-side">  
                                <div  className="panel-text-display">
                                { Object.keys(summary).map(key => (
                                    <ul id={key}>
                                        <label id={key} className="panel-label-header" 
                                        style={{ color: mapcolor }} >{key}</label><br/>
                                        <label className="panel-label-value" 
                                        style={{ color: mapcolor }}>{summary[key]}</label>
                                    </ul>
                                    ))}
                                </div>  
                            
                        </div>     
                    </div>
        );    
                    {/* <div className="panel-center-side">
                            <img src="KeraLAFloodScreen_elBlue_289304.png"/>
                            </div> 
                             <div className="panel-left-side">
                                <div className="panel-text-display">
                                <label className="panel-label-header">DEAD</label> <br/>
                                <label className="panel-label-value">{props.disasterDataRecord.dead}</label><br/>
                                <label className="panel-label-header">DEATH FROM INFECTIOUS DIESEASE</label><br/> 
                                <label className="panel-label-value">{0}</label><br/>
                                <label className="panel-label-header">DIESEASE SPREAD</label> <br/>
                                <label className="panel-label-value">{0}</label><br/>
                                <label className="panel-label-header">PEOPLE MISSING</label> <br/>
                                <label className="panel-label-value">{props.disasterDataRecord.missing}</label><br/>
                                </div>
                            </div>    
                     </div>  */}
           

    }   
    
}
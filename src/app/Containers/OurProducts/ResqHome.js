import React from "react";
import ReactDOM from "react-dom";
import {ButtonToolbar, Button } from 'react-bootstrap';
import { DisasterTypeMap } from "./DisasterTypeMap";
import './ResqHome.css';


export class ResqHome extends React.Component{
    constructor(props) {
        super(props);  
        //self = this;
        this.state = {
            sDateRange: 'week',
            sDisasterType: 'all',
            sButtonClickFlag: false,
            sSpecificDisasterTypeData: [],
            sDisasterTypeFilter:[],
            sDateRangeFilters: ''

        } 
    } 

    fetchSpecificDisasterTypeData(){
        const lEndPoint = "http://167.86.104.221:8050/api/qresq/search"
        try 
        {
            fetch(lEndPoint,{
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({size: 2000, indexName: 'test_alert', 
                        filters: this.state.sDisasterTypeFilter  
                    })
        
            })
            .then(response => response.json()) 
            .then(json => {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&in fetchSpecificDisasterTypeData function in RESQHOME","specificDisasterTypeFetch ",JSON.stringify(json));
                this.setState({
                    sSpecificDisasterTypeData: json.results
                })  
                
            })
            .catch(error =>{
              console.log("ERROR" + error);     
            })
      
        } 
        catch (error) {
            console.log(error);
        }
 }

    handleSubmitBannerClick(e){
        
        //this.forceUpdate();
        if(e.target.id === "week" || e.target.id ==="month")
        {
            this.setState(
                {
                 sDateRange: e.target.id,
                 sButtonClickFlag: true
            });
        }
        if(e.target.id === "EQ" || e.target.id ==="HU" || 
           e.target.id === "FL" || e.target.id ==="TC" )
        {
            this.setState({
                sDisasterType: e.target.id,
                sButtonClickFlag: true 
            });
            this.state.sDisasterTypeFilter.pop();
            this.state.sDisasterTypeFilter.push({
                                                fieldName: 'disasterType',
                                                type: 'string',
                                                value: e.target.id
                                                })

         }
        if(e.target.id  === "all")
        {
            this.setState({
                sDisasterType: e.target.id,
                sButtonClickFlag: true
            });
            this.state.sDisasterTypeFilter.pop(); 
        }
        console.log("&&&&&&&&&&&&&&&&&&&&&&&",this.state.sDisasterTypeFilter);
        //React.unmountComponentAtNode(e.target);
        
        this.fetchSpecificDisasterTypeData();
        this.componentWillUnmount();
    }

    renderBanner(){
        return(
            <div className="resq-banner">       
                <div className="resq-logo"> resq</div>
                <div className="resq-daterange"> 
                    <div className="date-range-header">DATE RANGE</div>
                    <ButtonToolbar className="date-range-button-group"
                                            onClick={this.handleSubmitBannerClick.bind(this)}>
                        <Button className="one-month-button" type="submit" id="month">ONE MONTH</Button>
                        <Button className="one-week-button" type="submit"  id="week">ONE WEEK</Button>     
                    </ButtonToolbar>
                </div>
                <div className="resq-disastertype">
                    <div className="disaster-type-header">DISASTER TYPE</div>            
                        <ButtonToolbar className="disaster-type-button-group"
                                            onClick={this.handleSubmitBannerClick.bind(this)}>
                            <Button className="all-button" type="submit" id="all">ALL</Button>
                            <Button className="earthquake-button" type="submit"  id="EQ">EARTHQUAKE</Button>
                            <Button className="flood-button" type="submit" id="FL" >FLOOD</Button>
                            <Button className="storm-button" type="submit" id="TC">STORM</Button>
                            <Button className="humanitarian-button" type="submit" id="HU">HUMANITARIAN</Button>        
                        </ButtonToolbar>
                </div>   
            </div>  
        )
    }
    componentWillUnmount()
    {
        console.log("!!!!!!!!!!!!!!!!!@@@@@i am in componentWillUnmount DISASTERTYPE");
        //ReactDOM.unmountComponentAtNode(document.getElementById('ResqHomeParentDiv')); 
        //ReactDOM.unmountComponentAtNode(this.getDOMNode());
        //this.render(); ReactDOM.render(
            console.log("this.state.sButtonClickFlag",this.state.sButtonClickFlag);
            
            // ReactDOM.render(
            //     <DisasterTypeMap 
            //                         DisasterTypeFilter ={this.state.sDisasterTypeFilter}
            //                         SpecificDisasterTypeData={this.state.sSpecificDisasterTypeData}
            //                         ButtonClickFlag={this.state.sButtonClickFlag}
            //                         DisasterType={this.state.sDisasterType} 
            //                         DateRange={this.state.sDateRange}/>
            //                         ,document.getElementById('ResqHomeDiv'));
        
    }
    render() 
    {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&render RESQHOME");  
        return(
            <div id="ResqHomeParentDiv" className="resq-new-window">  
                {this.renderBanner()}
                <div className="resq-wrapper" id="ResqHomeDiv"> 
                { !this.state.sButtonClickFlag ?
                    <DisasterTypeMap 
                                    //DisasterTypeFilter ={this.state.sDisasterTypeFilter}
                                    //SpecificDisasterTypeData={this.state.sSpecificDisasterTypeData}
                                    ButtonClickFlag={this.state.sButtonClickFlag}
                                    DisasterType={this.state.sDisasterType} 
                                    DateRange={this.state.sDateRange}/>:
                    <DisasterTypeMap 
                                    //DisasterTypeFilter ={this.state.sDisasterTypeFilter}
                                    SpecificDisasterTypeData={this.state.sSpecificDisasterTypeData}
                                    ButtonClickFlag={this.state.sButtonClickFlag}
                                    DisasterType={this.state.sDisasterType} 
                                    DateRange={this.state.sDateRange}/>

                }
                    
                </div> 
            </div>      
        );  
    }//render 
}//class
    
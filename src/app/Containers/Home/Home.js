import React from "react";
import './Home.css';


import drawWordCloud from "./WordCloudFn";


const jsonData=[
  {text:"fani",value:36737}, {text:"cyclone",value: 31934}, {text:"odisha",value: 17420}, 
      {text:"cyclonefani",value: 15427}, {text:"number",value: 10985}, {text:"different",value: 6562}, 
      {text:"districts",value: 6253}, {text:"storm",value: 5903}, {text:"helpline",value: 5843}, 
      {text:"please",value: 5825}, {text:"emergency",value: 5766}, {text:"situation",value: 5677}, 
      {text:"issued",value: 5591}, {text:"control",value: 5522}, {text:"room",value: 5478}, 
      {text:"odishas",value: 5372}, {text:"due",value: 5336}, {text:"puri",value: 5252}, 
      {text:"retweet",value: 4986}, {text:"severe",value: 4602}, {text:"people",value: 4597}, 
      {text:"cyclonic",value: 4532}, {text:"provide",value: 4316}, {text:"may",value: 4191}, 
      {text:"possible",value: 4167}, {text:"safety",value: 4092}, {text:"assistance",value: 3889}, 
      {text:"coast",value: 3840}, {text:"bengal",value: 3817}, {text:"affected",value: 3649},
       {text:"government",value: 3566}, {text:"take",value: 3260}, {text:"central",value: 3198},
        {text:"india",value: 3187}, {text:"wake",value: 3134}, {text:"spoke",value: 3111},
         {text:"fanicyclone",value: 3032}, {text:"ready",value: 2893}, {text:"high",value: 2867}, 
         {text:"landfall",value: 2770}, {text:"arising",value: 2714}, {text:"preparedness",value: 2638}, 
         {text:"also",value: 2505}, {text:"well",value: 2454}, {text:"state",value: 2394}, {text:"meeting",value: 2365},
          {text:"hit",value: 2311}, {text:"help",value: 2269}, {text:"live",value: 2256}, {text:"prayers",value: 2246}
]

export class Home extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          
        } 
    }   
  render() {
  
    return(
      
      <div className="home">
      
      <div  id= "#chart" className="home-left-banner">
      {drawWordCloud(jsonData, "chart")}
      left banner</div>  
      <div className="home-right-banner">
      right banner</div>
  </div>
      )
    }
}
    
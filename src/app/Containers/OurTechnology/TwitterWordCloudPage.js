import React, { Component } from 'react';
//import WordCloud from "react-d3-cloud";
import drawWordCloud from "../OurProducts/WordCloudFn";
import '../OurProducts/cloud';

// const jsonData1=[
//     {text:"fani",value:36737}, {text:"cyclone",value: 31934}, {text:"odisha",value: 17420}, 
//         {text:"cyclonefani",value: 15427}, {text:"number",value: 10985}, {text:"different",value: 6562}, 
//            {text:"fanicyclone",value: 3032}, {text:"ready",value: 2893}, {text:"high",value: 2867}, 
//            {text:"landfall",value: 2770}, {text:"arising",value: 2714}, {text:"preparedness",value: 2638}, 
//            {text:"also",value: 2505}, {text:"well",value: 2454}, {text:"state",value: 2394}, {text:"meeting",value: 2365},
//             {text:"hit",value: 2311}, {text:"help",value: 2269}, {text:"live",value: 2256}, {text:"prayers",value: 2246}
// ]
// const fontSizeMapper = jsonData1 => Math.log2(jsonData1.value)*2;
// const rotate = jsonData1 => (jsonData1.value)%360;

export class TwitterWordCloudPage extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                locTwitterWorldCloudData: [],
                locTwitterWorldCloudFlag: false,
            }
        }

    componentDidMount() 
    {  
        console.log("entering componentDidMount TwitterWordCloudPage");
        console.log("eventId", this.props.qresqid);
        
        const endPoint = "http://167.86.104.221:8050/api/dasboard/wordCloud?index=test_wordcloud&eventId="
                        //+this.props.qresqid;
                        +"999";
        fetch(endPoint,{
            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                    },
                    method: "GET"
        })
        .then(response => response.json()) 
        .then(json => {
                this.setState({
                    locTwitterWorldCloudData: json.results,
                    ocTwitterWorldCloudFlag: true,
                }) 
            console.log("this.state.locTwitterWorldCloudData",this.state.locTwitterWorldCloudData);                
        })
        .catch(error =>{
                    console.log("ERROR" + error);     
        })
        console.log("leaving componentDidMount TwitterWordCloudPage");   
    }
    componentDidUpdate(){
        const selector = document.getElementById('chart'); 
        var jsonData =[];
        this.state.locTwitterWorldCloudData.map(data =>{
            
                if(data.totalTweets > 0 && data.totalTweets <= 1000)
                {
                    jsonData.push({
                        text: data.word,
                        totalTweets: data.totalTweets,
                        size: 24
                    })
                    
                }
                else if(data.totalTweets > 1000 && data.totalTweets <= 5000){
                    jsonData.push({
                        text: data.word,
                        totalTweets: data.totalTweets,
                        size: 34
                    })
                    
                }
                else if(data.totalTweets > 5000 && data.totalTweets <= 10000){
                    jsonData.push({
                        text: data.word,
                        totalTweets: data.totalTweets,
                        size: 44
                    })
                }
        });
        console.log("jsonData", jsonData);  
        if(selector && jsonData){ 
          drawWordCloud(jsonData,selector)
        }
    }
    render()
    {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&"); 
        console.log("render TwitterWordCloudPage"); 
        return(
            <div  id='chart'/>
                // {/* <WordCloud data={jsonData} width={600}  height={300} padding={5}
                // fontSizeMapper={fontSizeMapper}  rotate={0} />  </div> */} 
        );
    }

}//class

import React, { Component } from 'react';
import GoogleMapReact, { AnyReactComponent} from 'google-map-react';
import {ButtonToolbar, Button } from 'react-bootstrap';
import "./FullSummaryReport.css";
import { googleHeatMapStyleConst } from './GoogleHeatMapStyle';

const styles =  {
    container4: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        position: 'relative' 
    },
    mapDiv4: {
      padding: 0,
      margin: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: 'grey'
  }, 
  }

export class FullSummaryReport extends Component {
  constructor(props) {
    super(props);
  }
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };

      
   
//       initMap = () =>{
//         var map = new window.google.maps.Map(document.getElementById('googlemap'), {
//           center: {lat: this.props.glatitude, lng: this.props.glongitude},
//           zoom: 6,
//           styles: googleStyleConst
//         })
//         console.log(googleStyleConst);
        

//         //create an info window
//         var infowindow = new window.google.maps.InfoWindow()
 
//         //Display dynamic maker
//         //this.props.disasterDataRecord.map(itemDisaster => {

//           //  console.log(itemDisaster.city);
           
//             var contentString = `${this.props.disasterDataRecord.location}`

//             console.log("map color is",this.props.mapcolor);
            
            
//             //var cityCircle = {
//               var cityCircle =  new google.maps.Circle({

//               strokeColor: this.props.mapcolor,
//               strokeOpacity: 0.8,
//               strokeWeight: 3,
//               scale: 8,
//               fillColor: this.props.mapcolor,
//               fillOpacity: 0.65,
//               radius: 14000,

//               center: {
//                 lat: this.props.glatitude, 
//                 lng: this.props.glongitude,
//               },
//               map: map,
//               title: this.props.disasterDataRecord.tweet
//             });

//             //create marker
//            // var marker = new google.maps.Marker({

//             //var marker = new window.google.maps.Marker({
        
//             //   position: {
//             //     lat: this.props.glatitude, 
//             //     lng: this.props.glongitude,
//             //   },
//             //   icon: cityCircle,
//             //   map: map,
//             //   title: this.props.disasterDataRecord.tweet
//             // })
            
//             //Click on a Marker
//             //marker.addListener('click', function() {
//             cityCircle.addListener('click', function() {
//                 //chandge the content
//                 infowindow.setContent(contentString)

//                 // open an info window
//                 //infowindow.open(map, marker);
//                 infowindow.open(map, cityCircle);
//             });

//         //})
//   }
//   renderMap = () => {
//     // loadScritpt("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBlnYj0D5PuFnI_iopaie_z9GpKGKN3VAY&callback=initMap")
//     //loadScritpt("https://maps.googleapis.com/maps/api/js?key=AIzaSyANrDl8OJ1MG40sPHv0tewGfENPVVbrTCM&callback=initMap")
//     loadScritpt("http://google.org/crisismap/weather_and_events?hl=en-GB&llbox=58.12%2C7.17%2C-39.68%2C-146.02&t=TERRAIN&layers=30%2C1%2C31%2C32%2C20%2C12%2Clayer9%2C2%2C10%2C6%2C13%2Clayer0%2Clayer1%2C14%2C3%3A100%2C8%2C7%2C9%2C5%2C4%2C1340721268837%2C1343411315379%2Clayer7%2Clayer8%2Clayer10%2C24&callback=initMap")

//     //<iframe width="400" height="400" src="http://google.org/crisismap/weather_and_events?hl=en&llbox=83.3%2C-63.8%2C87.1%2C87.1&t=TERRAIN&layers=30%2C1%2C31%2C32%2C20%2C12%2Clayer9%2C2%2C3%3A100%2C14%2Clayer0%2C10%2C6%2C13%2C4%2C5%2C9%2C7%2C8%2C1340721268837%2C1343411315379%2Clayer8%2Clayer10%2C24&embedded=true" style="border: 1px solid #ccc"></iframe>
//    // <iframe width="400" height="400" src="http://google.org/crisismap/weather_and_events?hl=en-GB&llbox=58.12%2C7.17%2C-39.68%2C-146.02&t=TERRAIN&layers=30%2C1%2C31%2C32%2C20%2C12%2Clayer9%2C2%2C10%2C6%2C13%2Clayer0%2Clayer1%2C14%2C3%3A100%2C8%2C7%2C9%2C5%2C4%2C1340721268837%2C1343411315379%2Clayer7%2Clayer8%2Clayer10%2C24&embedded=true" style="border: 1px solid #ccc"></iframe>
//     window.initMap = this.initMap
// }

renderMap(){
  return(
    <iframe width="400" height="400" src="http://google.org/crisismap/weather_and_events?hl=en-GB&llbox=58.12%2C7.17%2C-39.68%2C-146.02&t=TERRAIN&layers=30%2C1%2C31%2C32%2C20%2C12%2Clayer9%2C2%2C10%2C6%2C13%2Clayer0%2Clayer1%2C14%2C3%3A100%2C8%2C7%2C9%2C5%2C4%2C1340721268837%2C1343411315379%2Clayer7%2Clayer8%2Clayer10%2C24&embedded=true" style="border: 1px solid #ccc"></iframe>
  );
}
// fullDetailClick(e){
 
//   if(e.target.id === "shelter")
//   {
//   }
//   if(e.target.id === "rescue")
//   {  
//   }
//   if(e.target.id === "foodwater")
//   {
//   }
//   if(e.target.id === "relief")
//   {  
//   }
//   if(e.target.id === "helpline")
//   {
//   }
//   if(e.target.id === "socialmedia")
//   {  
//   }
//   if(e.target.id === "medicine")
//   {
//   }
//   if(e.target.id === "transport")
//   {  
//   }
//   if(e.target.id === "jeeprescue")
//   {
//   }
//   if(e.target.id === "volunteers")
//   {  
//   }
//   if(e.target.id === "drinkwater")
//   {
//   }
//   if(e.target.id === "power")
//   {  
//   }
//   if(e.target.id === "clothing")
//   {
//   }
//   if(e.target.id === "ambulance")
//   {  
//   }
//   if(e.target.id === "phone")
//   {  
//   }
// }

// renderMenu()
// {
//   return(
//     <div className="panel-left-menu">  
//        <ButtonToolbar className="full-detail-button-group"
//                                     onClick={this.fullDetailClick.bind(this)}>
//           <div className="button-div">  
//             <img className="img1" src={'../public/Images/Shelter.png'}/>
//             <Button className="shelter-button" type="submit" id="shelter">Shelter</Button>
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Rescue.png'}/>
//             <Button className="rescue-button" type="submit" id="rescue">Rescue</Button>    
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="food-water-button" type="submit" id="foodwater">Food and Water</Button>
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="relief-button" type="submit" id="relief">Relief Material Collection</Button> 
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="helpline-button" type="submit" id="helpline">Helpline</Button>
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="media-button" type="submit" id="socialmedia">Rescue</Button> 
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="medicine-button" type="submit" id="medicine">Medicines and Essentials</Button>
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="tranportation-button" type="submit" id="transport">Transportation</Button> 
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Jeep.png'}/>
//             <Button className="jeep-rescue-button" type="submit" id="jeeprescue">Jeep Rescue</Button>
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="volunteer-button" type="submit" id="volunteers">Volunteers</Button> 
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="drinking-water-button" type="submit" id="drinkwater">Drinking Water</Button>
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="power-button" type="submit" id="power">Power</Button> 
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="clothing-button" type="submit" id="clothing">Clothing</Button>
//           </div>  
//           <div className="button-div"> 
//             <img className="img1" src={'../public/Images/Helpline.png'}/>
//             <Button className="ambulance-button" type="submit" id="ambulance">Ambulance</Button> 
//           </div>  
//           <Button className="phone-location-button" type="submit" id="phone">SEE PHONE LOCATION</Button> 
//         </ButtonToolbar>
//     </div>
//   );
// }

  render() {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("render FULLSUMMARYREPORT");
        return (
          <div  id="googlecontainer" style={styles.container4} > 
              
              <div id="googlemap" style={ styles.mapDiv4 } >
              <iframe style={{width:"100%", height:"100%", style:"border: 1px solid #ccc"}} 
              src="http://google.org/crisismap/weather_and_events?hl=en-GB
              &llbox=`$this.props.glatitude` %2C7.17%2C-39.68%2C`$this.props.glongitude`
              &t=TERRAIN
              &layers=30%2C1%2C31%2C32%2C20%2C12%2C
              layer9%2C2%2C10%2C6%2C13%2C
              layer0%2C
              layer1%2C14%2C3%3A100%2C8%2C7%2C9%2C5%2C4%2C1340721268837%2C1343411315379%2C
              layer7%2C
              layer8%2C
              layer10%2C24
              &embedded=true" ></iframe>
               this.props.glatitude, lng: this.props.glongitude
              {/* {this.renderMap()} */}
              </div>
              {/* {this.renderMenu()} */}
          </div>
        ); 
  }//render
}//class

// function loadScritpt(url){
//     var index = window.document.getElementsByTagName("script")[0]
//     var script= window.document.createElement("script")
//     script.src = url
//     script.async =true
//     script.defer = true
//     script.type = "text/javascript"
//     index.parentNode.insertBefore(script, index)
  
  
// }
export default FullSummaryReport;
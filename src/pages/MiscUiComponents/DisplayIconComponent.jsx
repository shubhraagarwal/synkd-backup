import React from "react";

import { IonImg } from "@ionic/react";
//Fans-----------------------------------------------------------------
import tableFan from "../../images/device-icons/fan/tableFan.png"
import ceilingFan from "../../images/device-icons/fan/ceilingFan.svg"
import towerFan from "../../images/device-icons/fan/towerFan.png"
//Fans-----------------------------------------------------------------

//Kitchen-----------------------------------------------------------------
import blender from "../../images/device-icons/kitchen/blender.png"
import stove from "../../images/device-icons/kitchen/stove.png"
import oven from "../../images/device-icons/kitchen/oven.png"
import kitchen from "../../images/device-icons/kitchen/kitchen.svg"
//Kitchen-----------------------------------------------------------------


//Bathroom-----------------------------------------------------------------
import Bathroom from "../../images/device-icons/bathroom/bathroom.svg"
import pump from "../../images/device-icons/bathroom/pump.png"
import toilet from "../../images/device-icons/bathroom/toilet.png"
import washingMachine from "../../images/device-icons/bathroom/washingMachine.png"
//Bathroom-----------------------------------------------------------------



//Room-----------------------------------------------------------------
import balcony from "../../images/device-icons/room/balcony.svg"
import bed from "../../images/device-icons/room/bed.svg"
import dining from "../../images/device-icons/room/chair.svg"
import closet from "../../images/device-icons/room/closet.svg"
import living from "../../images/device-icons/room/livingRoom.svg"
import bar from "../../images/device-icons/room/bar.png"
import shoeRack from "../../images/device-icons/room/shoeRack.svg"
import fanControl from "../../images/device-icons/room/fanController.jpg"
import twoWaySwitch from "../../images/device-icons/room/twoWaySwitch.jpg"

//Room-----------------------------------------------------------------




//Lights-----------------------------------------------------------------
import bulb from "../../images/device-icons/lights/bulb.png"
import ceilingLamp from "../../images/device-icons/lights/ceilingLamp.png"
import lamp from "../../images/device-icons/lights/lamp.png"
//Ligths-----------------------------------------------------------------

//Privacy-----------------------------------------------------------------
import blinds from "../../images/device-icons/privacy/blinds.png"
import curtains from "../../images/device-icons/privacy/curtains.svg"
import gate from "../../images/device-icons/privacy/gate.svg"
//Privacy-----------------------------------------------------------------

//TV-----------------------------------------------------------------
import tv from "../../images/device-icons/tv/tv.svg"
import tvBox from "../../images/device-icons/tv/tvBox.svg"
import mediaPlayer from "../../images/device-icons/tv/mediaPlayer.svg"
//TV-----------------------------------------------------------------

//Other-----------------------------------------------------------------
import wifiRouter from "../../images/device-icons/other/wifiRouter.png"
import waterHeater from "../../images/device-icons/other/waterHeater.png";
import ac from "../../images/device-icons/other/ac.png";
import exhaustFan from "../../images/device-icons/other/exhaustFan.png";
import homeTheatre from "../../images/device-icons/other/homeTheatre.png";
//Other-----------------------------------------------------------------


class DisplayIconComponent extends React.Component{




    render(){ 


        switch(this.props.icon.iconname){
            case "FAN":
                switch(this.props.icon.int){
                    case 0:
                        return(<IonImg src={ceilingFan}  style={{padding: "25%"}}></IonImg>);

                    case 1:
                        return(<IonImg src={towerFan}  style={{padding: "25%"}}></IonImg>);

                    case 2:
                        return(<IonImg src={tableFan}  style={{padding: "25%"}}></IonImg>);

                }
                break;
    
    
    
    
    
            case "ROOM":
                switch(this.props.icon.int){
                    case 0:
                        return(<IonImg src={living}  style={{padding: "25%"}}></IonImg>);

                    case 1:
                        return(<IonImg src={bed}  style={{padding: "25%"}}></IonImg>);

                    case 2:
                        return(<IonImg src={balcony}  style={{padding: "25%"}}></IonImg>);

                    case 3:
                        return(<IonImg src={closet}  style={{padding: "25%"}}></IonImg>);

                    case 4:
                        return(<IonImg src={shoeRack}  style={{padding: "25%"}}></IonImg>);

                    case 5:
                        return(<IonImg src={dining}  style={{padding: "25%"}}></IonImg>);

                    case 6:
                        return(<IonImg src={kitchen}  style={{padding: "25%"}}></IonImg>);

                    case 7:
                        return(<IonImg src={oven}  style={{padding: "25%"}}></IonImg>);

                    case 8:
                        return(<IonImg src={Bathroom}  style={{padding: "25%"}}></IonImg>);

                    case 9:
                        return(<IonImg src={toilet}  style={{padding: "25%"}}></IonImg>);

                    case 10:
                        return(<IonImg src={bar}  style={{padding: "25%"}}></IonImg>);

                    case 11:
                        return(<IonImg src={fanControl}  style={{padding: "25%"}}></IonImg>);

                    case 12:
                        return(<IonImg src={twoWaySwitch}  style={{padding: "25%"}}></IonImg>);

                }
                break;
    
    
    
    
    
    
            case "APPLIANCE":
                switch(this.props.icon.int){
                    case 0:
                        return(<IonImg src={curtains}  style={{padding: "25%"}}></IonImg>);

                    case 1:
                        return(<IonImg src={blinds}  style={{padding: "25%"}}></IonImg>);

                    case 2:
                        return(<IonImg src={gate}  style={{padding: "25%"}}></IonImg>);

                    case 3:
                        return(<IonImg src={ac}  style={{padding: "25%"}}></IonImg>);

                    case 4:
                        return(<IonImg src={waterHeater}  style={{padding: "25%"}}></IonImg>);

                    case 5:
                        return(<IonImg src={exhaustFan}  style={{padding: "25%"}}></IonImg>);

                    case 6:
                        return(<IonImg src={homeTheatre}  style={{padding: "25%"}}></IonImg>);

                    case 7:
                        return(<IonImg src={wifiRouter}  style={{padding: "25%"}}></IonImg>);

                    case 8:
                        return(<IonImg src={tv}  style={{padding: "25%"}}></IonImg>);

                    case 9:
                        return(<IonImg src={tvBox}  style={{padding: "25%"}}></IonImg>);

                    case 10:
                        return(<IonImg src={mediaPlayer}  style={{padding: "25%"}}></IonImg>);

                    case 11:
                        return(<IonImg src={pump}  style={{padding: "25%"}}></IonImg>);

                    case 12:
                        return(<IonImg src={washingMachine}  style={{padding: "25%"}}></IonImg>);

                    case 13:
                        return(<IonImg src={blender}  style={{padding: "25%"}}></IonImg>);

                    case 14:
                        return(<IonImg src={stove}  style={{padding: "25%"}}></IonImg>);
                        
                }
                break;
            
    
    
    
    
            case "LIGHTS":
                switch(this.props.icon.int){
                    case 0:
                        return(<IonImg src={ceilingLamp}  style={{padding: "25%"}}></IonImg>);

                    case 1:
                        return(<IonImg src={bulb}  style={{padding: "25%"}}></IonImg>);

                    case 2:
                        return(<IonImg src={lamp}  style={{padding: "25%"}}></IonImg>);
                        
                }
                break;

                default:
                    return(<IonImg src=""  style={{padding: "25%"}}></IonImg>);

        }
        
        
 
    }

}

export default DisplayIconComponent;
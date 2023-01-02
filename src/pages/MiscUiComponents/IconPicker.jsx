/* This apge lets user choose icons for the slots */

import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonImg,
  IonContent,
  IonTitle,
  IonRow,
  IonFooter,
  IonPage
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import React from "react";

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
import blinds from "../../images/device-icons/privacy/blinds.svg"
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





import { withRouter } from "react-router-dom";

class SlotsIconPage extends React.Component {
  
  refreshPage() {
    window.location.reload();
  }

  Fan(int) 
  {this.props.component({ComponentType: 2, ComponentProperties: this.props.properties, icon: {iconname: "FAN", int: int}}); }

  Lights(int) 
  { this.props.component({ComponentType: 2, ComponentProperties: this.props.properties, icon: {iconname: "LIGHTS", int: int}}); }


Room(int)  
{this.props.component({ComponentType: 2, ComponentProperties: this.props.properties, icon: {iconname: "ROOM", int: int}}); }


Appliance(int)
{this.props.component({ComponentType: 2, ComponentProperties: this.props.properties, icon: {iconname: "APPLIANCE", int: int}}); }



backButton(){ this.props.onDidDismiss(this.props.properties);}



  render() {
    return (
      <IonPage>
 <IonContent>      


 <IonHeader class="ion-no-border">
                 <IonToolbar  mode="ios" >
                  <IonButton slot="start"
                             fill="clear"
                             color="dark"
                             onClick={() => this.backButton()}
                             >
        
                            <IonIcon
                              icon={arrowBack}
                              size="medium"
                             >
                            </IonIcon>
                  
                  </IonButton>
                  <IonTitle slot="secondary">PICK AN ICON</IonTitle>
                  </IonToolbar>
            </IonHeader>
       
        <IonGrid className="icon-grid">


{/* LIGHTS============================================================================== */}

          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Lights(0)}
              >
              <IonImg src={ceilingLamp}  style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Lights(1)}
              >
                <IonImg src={bulb} style={{padding: "25%"}}></IonImg>
              </IonButton>
            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Lights(2)}
              >
                <IonImg src={lamp}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>





{/* LIGHTS============================================================================== */}




{/* FAN============================================================================== */}





          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Fan(0)}
              >
              <IonImg src={ceilingFan}   style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Fan(1)}
              >
                <IonImg src={towerFan} style={{padding: "25%"}}></IonImg>
              </IonButton>

            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Fan(2)}
              >
                <IonImg src={tableFan}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>




{/* FAN============================================================================== */}



{/* Other Appliances============================================================================== */}

          
          
          
          


          
          {/* Row 1============================================================================== */}


          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(0)}
              >
              <IonImg src={curtains}  style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(1)}
              >
                <IonImg src={blinds} style={{padding: "25%"}}></IonImg>
              </IonButton>
            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Appliance(2)}
              >
                <IonImg src={gate}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>

          {/* Row 1============================================================================== */}








          {/* Row 2============================================================================== */}


          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(3)}
              >
              <IonImg src={ac}  style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(4)}
              >
                <IonImg src={waterHeater} style={{padding: "25%"}}></IonImg>
              </IonButton>
            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Appliance(5)}
              >
                <IonImg src={exhaustFan}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>

          {/* Row 2============================================================================== */}









          {/* Row 3============================================================================== */}


          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(6)}
              >
              <IonImg src={homeTheatre}  style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(7)}
              >
                <IonImg src={wifiRouter} style={{padding: "25%"}}></IonImg>
              </IonButton>
            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Appliance(8)}
              >
                <IonImg src={tv}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>

          {/* Row 3============================================================================== */}







          {/* Row 4============================================================================== */}


          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(9)}
              >
              <IonImg src={tvBox}  style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(10)}
              >
                <IonImg src={mediaPlayer} style={{padding: "25%"}}></IonImg>
              </IonButton>
            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Appliance(11)}
              >
                <IonImg src={pump}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>

          {/* Row 4============================================================================== */}







          {/* Row 5============================================================================== */}


          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(12)}
              >
              <IonImg src={washingMachine}  style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Appliance(13)}
              >
                <IonImg src={blender} style={{padding: "25%"}}></IonImg>
              </IonButton>
            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Appliance(14)}
              >
                <IonImg src={stove}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>

          {/* Row 5============================================================================== */}












{/* Room============================================================================== */}

          {/* Row 1============================================================================== */}

          <IonRow className="icon-row">
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Room(0)}
              >
              <IonImg src={living}  style={{padding: "25%"}}></IonImg>

              </IonButton>
         
            </IonCol>
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                color="light"
                onClick={() => this.Room(1)}
              >
                <IonImg src={bed} style={{padding: "25%"}}></IonImg>
              </IonButton>
            </IonCol>
            
            <IonCol className="icon-col" size="4">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="light"
                onClick={() => this.Room(2)}
              >
                <IonImg src={balcony}  style={{padding: "25%"}}></IonImg>
              </IonButton>
            
            </IonCol>
          </IonRow>

          {/* Row 1============================================================================== */}





          {/* Row 2============================================================================== */}

          <IonRow className="icon-row">
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(3)}
                        >
                        <IonImg src={closet}  style={{padding: "25%"}}></IonImg>

                        </IonButton>
                  
                      </IonCol>
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(4)}
                        >
                          <IonImg src={shoeRack} style={{padding: "25%"}}></IonImg>
                        </IonButton>
                      </IonCol>
                      
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          size="large"
                          expand="block"
                          color="light"
                          onClick={() => this.Room(5)}
                        >
                          <IonImg src={dining}  style={{padding: "25%"}}></IonImg>
                        </IonButton>
                      
                      </IonCol>
                    </IonRow>

                    {/* Row 2============================================================================== */}

            {/* Row 3============================================================================== */}

          <IonRow className="icon-row">
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(6)}
                        >
                        <IonImg src={kitchen}  style={{padding: "25%"}}></IonImg>

                        </IonButton>
                  
                      </IonCol>
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(7)}
                        >
                          <IonImg src={oven} style={{padding: "25%"}}></IonImg>
                        </IonButton>
                      </IonCol>
                      
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          size="large"
                          expand="block"
                          color="light"
                          onClick={() => this.Room(8)}
                        >
                          <IonImg src={Bathroom}  style={{padding: "25%"}}></IonImg>
                        </IonButton>
                      
                      </IonCol>
                    </IonRow>

                    {/* Row 3============================================================================== */}




          {/* Row 4============================================================================== */}

          <IonRow className="icon-row">
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(9)}
                        >
                        <IonImg src={toilet}  style={{padding: "25%"}}></IonImg>

                        </IonButton>
                  
                      </IonCol>
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(10)}
                        >
                          <IonImg src={bar} style={{padding: "25%"}}></IonImg>
                        </IonButton>
                      </IonCol>
                     
                    </IonRow>

                    {/* Row 4============================================================================== */}

{/* Rooms============================================================================== */}

<IonHeader class="ion-no-border">
                 <IonToolbar  mode="ios" >
                 
        
                            
               
                  <IonTitle slot="secondary">DEVICE TYPE</IonTitle>
                  </IonToolbar>
</IonHeader>
<IonRow className="icon-row">
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(11)}
                        >
                        <IonImg src={fanControl}  style={{padding: "25%"}}></IonImg>

                        </IonButton>
                  
                      </IonCol>
                      <IonCol className="icon-col" size="4">
                        <IonButton
                          fill="solid"
                          className="icon-btn ion-no-padding"
                          shape="round"
                          color="light"
                          onClick={() => this.Room(12)}
                        >
                          <IonImg src={twoWaySwitch} style={{padding: "25%"}}></IonImg>
                        </IonButton>
                      </IonCol>
                     
                    </IonRow>
          
        </IonGrid>

        </IonContent>
       


      </IonPage>
    );
  }
}

export default withRouter(SlotsIconPage);

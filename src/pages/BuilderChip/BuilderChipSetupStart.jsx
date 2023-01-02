import React from "react";
import {
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonLoading,
  IonTitle,
  IonButton,
  IonIcon,
  IonToast,
  IonContent,
  IonToolbar
} from "@ionic/react";
import { closeOutline, hardwareChip } from "ionicons/icons";
import "./BuilderChipSetupStart.css";

import { getChipInfo, getChipMACSetup } from "../ServerRequests/localApi";

var toastMsg = "";
var auth_token = "";


class BuilderChipSetupStart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

      this.state={
        showToast: false,
        loading: false,
        roomid: this.props.roomid
        
      }
  }




async verifyConnectionWithChip() {
  
        this.setState({loading: true});
        const response = await getChipMACSetup(this.state.ssid);

        if(response !== undefined){
          console.log(response[0].data.mac);
          switch(response[0].status){
            
            case 200: 

                const response_b = await getChipInfo();
                if(response_b !== undefined){

                  switch(response_b[0].status){

                    case 200:
                      this.props.component({ ComponentType: 2 , mac: response[0].data.mac, 
                                            roomid: this.state.roomid, slotCount: response_b[0].data.slotCount});
                      this.setState({loading: false});
                      break;

                    default:
                      break;

                  }

                }
                
                break;

                default:
                  toastMsg = "Could not verify chip. Are you sure you're connected to the chip?"
                  this.setState({showToast: true});
                  this.setState({loading: false});
                  break;
          
          }

        }else{
              toastMsg = "Could not verify chip. Are you sure you're connected to the chip?"
              this.setState({showToast: true});
              this.setState({loading: false});
        }

        this.setState({loading: false});
      

  }

  render() {
    return (
      <IonContent>
       <IonHeader className="ion-no-border">

            
            <IonToolbar mode="ios">
            <IonTitle  slot="secondary" >BUILDER CHIP SET-UP</IonTitle>
            <IonButton slot="end" size="large"  fill="clear"
            onClick={() => this.props.onDidDismiss(true)}> 
            <IonIcon icon={closeOutline} color="dark"></IonIcon>
            </IonButton>
            </IonToolbar>
           
            
           
          
       
          </IonHeader>
          
        
      <div>
      <p className="desc">
            If the light on the chip is not blinking, press and hold the 'mem_rst'
            button for 3 seconds and release. Next, look for the chip on the 'WiFi Networks' list 
            on your device and connect to it. Once connected, press the Start button.
          </p>
          <IonButton
                className="button_icon"
                color="light"
                fill="clear"
              >
                <IonIcon className="icon"  icon={hardwareChip}></IonIcon>
              </IonButton>

              <IonButton
                className="button_start"
                buttonType="button"
                shape="round"
                size="default"
                
                onClick={() => this.verifyConnectionWithChip()}
              >
                Start
              </IonButton>
              </div>

        <IonLoading
            isOpen={this.state.loading}
            onDidDismiss={() => this.setState({laoding: false})}
            message={'Attempting to communicate with chip...Please wait.'}
          />

        <IonToast
          isOpen={this.state.showToast}
          onDidDismiss={() => this.setState({showToast: false})}
          message={toastMsg}
          duration={3000}
        />
      </IonContent>
    );
  }
}

export default BuilderChipSetupStart;

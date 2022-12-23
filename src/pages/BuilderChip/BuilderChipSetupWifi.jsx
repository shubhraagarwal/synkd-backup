import React from "react";
import {
  IonItem,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonInput,
  IonToast,
} from "@ionic/react";
import { wifi, closeOutline } from "ionicons/icons";
import "./BuilderChipSetupWifi.css";
import { 
         changeChipSSID,
         changeChipPassword,
         resetChipWifi
       } from "../ServerRequests/localApi";

var toastMsg = "";



class BuilderChipSetupWifi extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ssid: "",
      pwd: "",
      show: false,
      settingUp: false,
      mac: this.props.mac,
      roomid: this.props.roomid
    };
  } 

  handleToast() {
    this.setState({
      show: !this.state.show
    });
  }



  async nextfn(){

    //1. Change SSID
    //2. Change Password
    //3. Reset WiFI
    if (!this.state.ssid||!this.state.pwd){
      toastMsg = "No field can be left empty.";
      this.handleToast();
  }else{
    if(this.state.settingUp){
      toastMsg = "Setting up... Please wait.";
      this.handleToast();
    }else{
//Change SSID======================================================================================
    this.setState({settingUp: true});
    const responseSSID = await changeChipSSID(this.state.ssid);

    if(responseSSID !== undefined){
      console.log(responseSSID[0]);
      switch(responseSSID[0].status){
        
        case 200: 
          console.log("Chip SSID Set");
          break;
        
          default:
          toastMsg = "SSID could not be changed.";
          this.handleToast();
          this.setState({settingUp: false});

          break;
        }
      }else{ this.setState({settingUp: false}); }
     
//Change Password======================================================================================


    const responsePassword = await changeChipPassword(this.state.pwd);

    if(responsePassword !== undefined){
      console.log(responsePassword[0]);
      switch(responsePassword[0].status){
        
        case 200: 
          console.log("Chip Password Set");
          this.props.component({ ComponentType: 3, mac: this.state.mac, roomid: this.state.roomid});
          this.setState({settingUp: false});

          break;
        
          default:
          toastMsg = "Password could not be changed.";
          this.handleToast();
          this.setState({settingUp: false});

          break;
        }
      }else{ this.setState({settingUp: false}); }
     
//Reset WiFi======================================================================================

// const responseReset = await resetChipWifi();

// if(responseReset !== undefined){
//   console.log(responseReset[0]);
//   switch(responseReset[0].status){
    
//     case 200: 
//       console.log("Chip WiFI reset.");
//       break;
    
//       default:
//       toastMsg = "Chip 'Wifi' could not be reset.";
//       this.handleToast();
//       break;
//     }
 
//     this.props.component({ ComponentType: 3});
//   }

//======================================================================================
  }

 }
}


  render() {
    return (
      <IonContent className="modal-bg">
       <IonHeader className="ion-no-border">

          <IonToolbar mode="ios">
          <IonTitle slot="secondary" color="light" >BUILDER CHIP SET-UP</IonTitle>
          <IonButton slot="end" size="large"  fill="light"
          onClick={() => this.props.onDidDismiss(true)}>
          <IonIcon icon={closeOutline} color="light"></IonIcon>
          </IonButton>
          </IonToolbar>
       
          <p className="desc_wifi" >
            Please enter the credentials of the WiFi network that you would like to set as the Chip's default.
          </p>
        
        </IonHeader>
        
       
       
              <IonButton
                className="button_wifi"
                size="large"
                fill="clear"
              >
                <IonIcon className="icon" icon={wifi}></IonIcon>
              </IonButton>
           
           <div className="inputFields">
           <IonItem >
            <IonInput
              placeholder="WiFi SSID"
              color="light"
              value={this.state.ssid}
              onIonChange={(data) => {
                this.setState({ ssid: data.target.value });
              }}
            ></IonInput>
         </IonItem>
         <IonItem>
            <IonInput
              placeholder="WiFI Password"
              color="light"
              type="password"
              value={this.state.pwd}
              onIonChange={(data) => {
                this.setState({ pwd: data.target.value });
              }}
            ></IonInput>
          </IonItem>
           </div>
          

        <IonButton
          className="button_set"
          shape="round"
          size="default"
          color="light"
          onClick={() => this.nextfn()}
        >
          Set
        </IonButton>
        <IonToast
          isOpen={this.state.show}
          onDidDismiss={() => this.setState({show: false})}
          message={toastMsg}
          color="light"
          duration={3000}
        />
      </IonContent>
    );
  }
}
    

export default BuilderChipSetupWifi;

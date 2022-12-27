/* Page lets users give names to slots */

import {
  IonButton,
  IonIcon,
  IonHeader,
  IonTitle,
  IonLoading,
  IonInput,
  IonContent,
  IonItem,
  IonToast,
} from "@ionic/react";
import React from "react";
import { closeOutline } from "ionicons/icons";
import DisplayIconComponent from "../MiscUiComponents/DisplayIconComponent"
import { setSlot } from "../ServerRequests/globalApi";

// import "./LoginPage.css";

var fieldTitle = "";
var auth_token;

class NameSlots extends React.Component {
  constructor(props) {
    super(props);
    auth_token = JSON.parse(localStorage.getItem("token"));
    this.state = {
      name: "",
      properties: this.props!==undefined?this.props.properties:"",
      mac: this.props!==undefined?this.props.properties.mac:"",
      icon: this.props!==undefined?this.props.icon: "",
      slotnumber: "",
      loading: false
    };
  }

 


  async CreateSlotFn() {

    if (!this.state.name || !this.state.slotnumber) {
      fieldTitle = "Both fields are required.";
      this.handleToast();
    }
    if (this.state.slotnumber && this.state.name) {
      if (this.state.slotnumber > 8) {
        fieldTitle = "Slot numbers must be between 1-8";
        this.handleToast();
      }else{

      if (this.state.slotnumber <= 0) {
        fieldTitle = "Slot numbers must be between 1-8";
        this.handleToast();
      }else{

        var data = JSON.stringify({name: this.state.name,
                                   slotnumber: this.state.slotnumber,
                                   mac: this.state.properties.mac,
                                   icon: this.state.icon});

        this.setState({loading: true});

                                   const response = await setSlot(data);
                                   if(response !== undefined){
                                     console.log(response[0]);
                                     switch(response[0].status){
                               
                                       case 200:
                                            console.log(response[0].data);
                                            this.setState({loading: false});
                                            this.props.onDidDismiss(true);
                                            break;

                                        default:
                                          fieldTitle = "Server Error. Could not set up.";
                                          this.handleToast();
                                          this.setState({loading: false});
                                          break;
                                      }

                                  } else {console.log(data);}
                  }
                }
            }

            this.setState({loading: false});
      }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
    
        <IonContent>
        <IonHeader className="ion-no-border">

            <div className="titleDiv">
            <IonTitle className="title" >DEVICE SET-UP</IonTitle>
            <IonButton className="close" size="large"  fill="clear"
            onClick={() => this.props.onDidDismiss(true)}>
            <IonIcon icon={closeOutline} color="dark"></IonIcon>
            </IonButton>
            </div>
            </IonHeader>
          <div
            style={{
              display: "flex",
              paddingTop: "2rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonButton
              fill="solid"
              className="icon-btn ion-no-padding"
              shape="round"
              size="large"
              expand="block"
              color="light"
              onClick={() =>  this.props.component({ComponentType: 1, ComponentProperties: this.props.properties})}
            >
              <DisplayIconComponent icon={this.state.icon}></DisplayIconComponent>
            </IonButton>
          </div>
          <IonItem className="rn-item">
            <IonInput
              className="rn-input"
              placeholder="Device Name"
              type="text"
              inputMode="text"
              maxlength="50"
              required="true"
              value={this.state.name}
              onIonChange={(data) => {
                this.setState({ name: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem className="rn-item">
            <IonInput
              className="rn-input"
              placeholder="Enter Slot Number(1-8)"
              type="number"
              maxlength="2"
              required="true"
              value={this.state.slotnumber}
              onIonChange={(data) => {
                this.setState({ slotnumber: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem lines="none" className="loginbtn_item">
            <IonButton
              className="rn-btn"
              buttonType="button"
              shape="round"
              size="default"
              color="primary"
              onClick={() => {
                this.CreateSlotFn();
              }}
            >
              SET-UP
            </IonButton>
          </IonItem>




          <IonLoading
            isOpen={this.state.loading}
            onDidDismiss={() => this.setState({laoding: false})}
            message={'Setting Up...'}
          />
          <IonToast
            isOpen={this.state.show}
            onDidDismiss={() => this.handleToast()}
            message={fieldTitle}
            duration={3000}
          />
        </IonContent>
    
    );
  }
}

export default NameSlots;

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
    IonToolbar
  } from "@ionic/react";
  import React from "react";
  import { closeOutline } from "ionicons/icons";
  import DisplayIconComponent from "../MiscUiComponents/DisplayIconComponent"
  import { createRoom } from "../ServerRequests/globalApi";
  
  // import "./LoginPage.css";
  
  var fieldTitle = "";
  var auth_token;
  
  class NameRoom extends React.Component {
    constructor(props) {
      super(props);
      auth_token = JSON.parse(localStorage.getItem("token"));
      this.state = {
        name: "",
        properties: this.props!==undefined?this.props.properties:"",
        icon: this.props!==undefined?this.props.icon: "",
        loading: false
      };
    }
  
   
  
  
async CreateRoomFn() {
    
var homeid = JSON.parse(localStorage.getItem("homeid"));
console.log(homeid);

if (!this.state.name) {
fieldTitle = "Room name is required.";
this.handleToast();
}else{
  
        var data = JSON.stringify({ roomname: this.state.name,
                                    homeid: homeid,
                                    iconname: this.state.icon});

        this.setState({loading: true});
  
        const response = await createRoom(data);
        if(response !== undefined){
                            console.log(response[0]);
                            switch(response[0].status){
                        
                                case 200:
                                    console.log(response[0].data);
                                    this.setState({loading: false});
                                    this.props.onDidDismiss(true);
                                    fieldTitle = "Created Room.";
                                    this.handleToast();
                                    break;

                                default:
                                fieldTitle = "Server Error. Could not set up.";
                                this.handleToast();
                                this.setState({loading: false});
                                break;
                            }

                        } else {
                            fieldTitle = "Connection Error.";
                            this.handleToast();
                            console.log(data);
                            this.setState({loading: false});

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
  
              <IonToolbar mode="ios">
              <IonTitle slot="secondary" >CREATE ROOM</IonTitle>
              <IonButton slot="end" size="large"  fill="clear"
              onClick={() => this.props.onDidDismiss(true)}>
              <IonIcon icon={closeOutline} color="dark"></IonIcon>
              </IonButton>
              </IonToolbar>
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
                placeholder="Room Name"
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
            {/* <IonItem className="rn-item">
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
            </IonItem> */}
            <IonItem lines="none" className="loginbtn_item">
              <IonButton
                className="rn-btn"
                buttonType="button"
                shape="round"
                size="default"
                color="primary"
                onClick={() => {
                  this.CreateRoomFn();
                }}
              >
                CREATE ROOM
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
  
  export default NameRoom;
  
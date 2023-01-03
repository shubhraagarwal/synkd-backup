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
  IonList,
  IonPopover,
  IonCol,
  IonRow,
  IonGrid,
  IonSkeletonText,
  IonPage,
  IonModal,
  IonLabel,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
// import  IonAccordi, IonLabel  from '@ionic/react';
// import IonAccordion from "@ionic/react";
// import IonAccordionGroup from "@ionic/react";
// import IonLabel from "@ionic/react";

import React from "react";
import { closeOutline } from "ionicons/icons";
import DisplayIconComponent from "../MiscUiComponents/DisplayIconComponent";
import { setSlot } from "../ServerRequests/globalApi";

// import "./LoginPage.css";

var fieldTitle = "";
var auth_token;

class NameSlots extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    auth_token = JSON.parse(localStorage.getItem("token"));
    this.state = {
      name: "",
      properties: this.props !== undefined ? this.props.properties : "",
      mac: this.props !== undefined ? this.props.properties.mac : "",
      icon: this.props !== undefined ? this.props.icon : "",
      slotnumber: "",
      loading: false,

      isOpen: false,
      homeid: "",
      rname: "",
      ricon: "",
      roomid: "",
      homename: "MY HOME",
      items: [],
      rooms: [],
      showSetupRoomModal: false,
      showSideMenuOptionsModal: false,
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
      } else {
        if (this.state.slotnumber <= 0) {
          fieldTitle = "Slot numbers must be between 1-8";
          this.handleToast();
        } else {
          var data = JSON.stringify({
            name: this.state.name,
            slotnumber: this.state.slotnumber,
            mac: this.state.properties.mac,
            icon: this.state.icon,
          });

          this.setState({ loading: true });

          const response = await setSlot(data);
          if (response !== undefined) {
            console.log(response[0]);
            switch (response[0].status) {
              case 200:
                console.log(response[0].data);
                this.setState({ loading: false });
                this.props.onDidDismiss(true);
                break;

              default:
                fieldTitle = "Server Error. Could not set up.";
                this.handleToast();
                this.setState({ loading: false });
                break;
            }
          } else {
            console.log(data);
          }
        }
      }
    }

    this.setState({ loading: false });
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }
  //   Room(int)
  // {this.props.component({ComponentType: 2, ComponentProperties: this.props.properties, icon: {iconname: "ROOM", int: int}}); }

  //get room name from local storage
  componentDidMount() {
    this._isMounted = true;

    var home_id = JSON.parse(localStorage.getItem("homeid"));

    var homeData = JSON.parse(localStorage.getItem(home_id));
    if (homeData !== null) {
      this.setState({
        items: homeData.rooms,
        homename: homeData.homename,
        rooms: homeData.rooms,
        loading: false,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //

  //
  //create a popover for room selection

  popover() {
    return (
      <IonPopover
        isOpen={this.state.isOpen}
        onDidDismiss={(e) => this.setState({ isOpen: false })}
      >
        <IonList>
          {this.state.rooms.map((item, index) => (
            <IonItem
              key={index}
              onClick={() => {
                this.setState({
                  rname: item.roomname,
                  ricon: item.icon,
                  roomid: item.roomid,
                  isOpen: false,
                });
              }}
            >
              <IonIcon
                icon={item.icon}
                style={{ fontSize: "1.5rem", marginRight: "1rem" }}
              ></IonIcon>
              {item.roomname}
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    );
  }

  render() {
    return (
      <IonContent style={{ height: "700px" }}>
        <IonHeader className="ion-no-border">
          <div className="titleDiv">
            <IonTitle className="title">DEVICE SET-UP</IonTitle>
            <IonButton
              className="close"
              size="large"
              fill="clear"
              onClick={() => this.props.onDidDismiss(true)}
            >
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
            onClick={() =>
              this.props.component({
                ComponentType: 1,
                ComponentProperties: this.props.properties,
              })
            }
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

        {/* {this.props.icon.iconname==='ROOM' && this.props.icon.int>10 ?  */}
        <>
          <select className="select-box">
            <option hidden value="opt1" style={{ color: "grey" }}>
              Select a option......
            </option>
            <option value="opt2">Option 1</option>
            <option value="opt3">Option 2</option>
            <option value="opt4">Option 3</option>

            <option value="opt5">Option 4</option>
          </select>
        </>
        {/* : null} */}

        {/* 
      {this.state.isOpen ? 
     
      
          
      
      <div className="popup-container">
                <div className='wrapper'>
                  
            
                </div>
            </div>
   :null } */}

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
        {/* {this.props.icon.iconname==='ROOM' && this.props.icon.int>10 ?  */}
        <div style={{ display: "flex", marginTop: "30px" }}>
          <input className="checkbox" type="checkbox" value="" id="" />
          <label className="checkbox-name">check for primary device</label>

          {/* <IonButton
            className="rn-btn"
            buttonType="button"
            shape="round"
            size="default"
            color="primary"
            alignItems="left"
            onClick={() => {
              this.setState({
                isOpen: true,
              });
              // this.Room();
              this.popover();
              // this.props.onDidDismiss(true)
            }}
          >
            Select Device
          </IonButton> */}

          <IonModal isOpen={this.state.showSetupRoomModal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Select Room</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    onClick={() => this.setState({ showSetupRoomModal: false })}
                  >
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid className="phome-grid">
                <IonRow className="phome-row">
                  {this.state.rooms.map((item, index) => (
                    <IonCol
                      className="phome-col ion-align-self-center"
                      size="4"
                      key={index}
                      onClick={() => {
                        this.setState({
                          rname: item.roomname,
                          ricon: item.icon,
                          roomid: item.roomid,
                          showSetupRoomModal: false,
                        });
                      }}
                    >
                      <DisplayIconComponent
                        icon={item.iconname}
                        size="medium"
                        className="io-icon"
                      />

                      {item.roomname}
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonContent>
          </IonModal>

          <IonButton
            onClick={() => this.setState({ showSetupRoomModal: true })}
            style={{ width: "100%" }}
          >
            <IonIcon
              icon={this.state.ricon}
              style={{ fontSize: "1.5rem", marginRight: "1rem" }}
            ></IonIcon>
            Select Device
          </IonButton>
        </div>
        {/* : null} */}
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
          onDidDismiss={() => this.setState({ laoding: false })}
          message={"Setting Up..."}
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

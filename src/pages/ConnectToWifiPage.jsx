import React from "react";
import {
  IonPage,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { hardwareChip } from "ionicons/icons";
import "./BuilderChip/BuilderChipSetupWifi.css";

var fieldTitle = "";
var auth_token = "";
var data = "";

var chiphomeIP = "192.168.4.1";

class ConnectToWifiPage extends React.Component {
  constructor() {
    super();
    auth_token = JSON.parse(localStorage.getItem("token"));
    this.state = {
      name: "",
      mac: "",
      roomid: "",
      state: "0",
      slotnames: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      sloticons: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
    };
  }

  componentDidMount() {
    var id = JSON.parse(localStorage.getItem("roomid"));
    this.setState({ roomid: id });
    var chipName = JSON.parse(localStorage.getItem("ChipName"));
    this.setState({ name: chipName });
    var macAdd = JSON.parse(localStorage.getItem("mac"));
    this.setState({ mac: macAdd });
  }

  NewSlotFn() {
    data = this.state;
    console.log(data);
    fetch("https://clickademy.in/switchcontrollers/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth_token,
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result
        .json()
        .then((resp) => {
          if (resp) {
            //this.setState({ items: resp.rooms });
            /*On success, setting the homeid in the local storage*/
            //let obj = resp.createdHome._id;
            //localStorage.setItem("homeid", JSON.stringify(obj));
            // if (resp.homeid != null) {
            //   this.props.history.push({ pathname: "/EHomePage" });
            // } else {
            //   this.props.history.push({ pathname: "/AddHomePage" });
            // }
            console.log(resp);

            // this.props.history.push({ pathname: "/PHomePage" });
          } else {
            fieldTitle = "Chip not created";
            this.handleToast();
          }
        })
        .catch((error) => {
          console.log("Chip not created", error);
        });
    });
  }

  NextFn() {
    this.NewSlotFn();
    this.props.history.push({ pathname: "/ChipLoad" });
  }

  render() {
    return (
      <IonPage>
        <IonHeader className="head">
          <IonToolbar>
            <IonTitle size="small">BUILDER CHIP SET-UP</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem lines="none">
          <p className="desc_ion">
            Please connect to the back to the WIFI from the Wifi Settings Page.
            Once Connected click on Next{" "}
          </p>
        </IonItem>
        <IonButton
          className="button_con"
          buttonType="button"
          shape="round"
          size="default"
          color="dark"
          onClick={() => this.NextFn()}
        >
          Next
        </IonButton>
      </IonPage>
    );
  }
}

export default ConnectToWifiPage;

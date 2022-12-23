import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonInput,
  IonContent,
  IonItem,
  IonToast,
} from "@ionic/react";
import React from "react";
import { bedSharp, fastFoodOutline, maleFemaleOutline } from "ionicons/icons";
import "./LoginPage.css";

var fieldTitle = "";
var iname = "";
var iconname = "";
var auth_token;

class NameRoom extends React.Component {
  constructor(props) {
    super(props);
    auth_token = JSON.parse(localStorage.getItem("token"));
    this.state = {
      roomname: "",
      homeid: "",
      iconname: "",
    };
  }

  componentDidMount() {
    iname = JSON.parse(localStorage.getItem("Ricon"));
    if (iname === "bedSharp") {
      iname = bedSharp;
    }
    if (iname === "fastFoodOutline") {
      iname = fastFoodOutline;
    }
    if (iname === "maleFemaleOutline") {
      iname = maleFemaleOutline;
    }
    var homeid1 = JSON.parse(localStorage.getItem("homeid"));
    this.setState({ homeid: homeid1 });
    this.setState({ iconname: iname });
  }

  refreshPage() {
    window.location.reload();
  }

  nextfn() {
    if (!this.state.roomname) {
      fieldTitle = "Please enter a Room Name";
      this.handleToast();
    } else {
      var data = this.state;
      fetch("https://clickademy.in/room/create", {
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
            if (resp.message === "Room Created") {
              /*On success, setting the homeid in the local storage*/
              //let obj = resp.;
              //localStorage.setItem("homeid", JSON.stringify(obj));
              // if (resp.homeid != null) {
              //   this.props.history.push({ pathname: "/EHomePage" });
              // } else {
              //   this.props.history.push({ pathname: "/AddHomePage" });
              // }
              console.log(resp);
              this.props.history.push({ pathname: "/PHomePage" });
              this.refreshPage();
            } else {
              fieldTitle = "Home not created";
              this.handleToast();
            }
          })
          .catch((error) => {
            console.log("Home not created", error);
          });
      });
    }
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <IonPage className="rn-page">
        <IonContent className="ion-content">
          <IonItem lines="none" className="room_name">
            <IonLabel className="ion-text-wrap ion_label1">
              Let's give your new room a name !
            </IonLabel>
          </IonItem>
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
              color="medium"
            >
              <IonIcon icon={iname} size="large" className="io-icon"></IonIcon>
            </IonButton>
          </div>
          <IonItem className="rn-item">
            <IonInput
              className="rn-input"
              placeholder="Bedroom"
              type="text"
              inputMode="text"
              maxlength="50"
              required="true"
              value={this.state.roomname}
              onIonChange={(data) => {
                this.setState({ roomname: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem lines="none" className="loginbtn_item">
            <IonButton
              className="rn-btn"
              buttonType="button"
              shape="round"
              size="default"
              color="medium"
              onClick={() => {
                this.nextfn();
              }}
            >
              Next
            </IonButton>
          </IonItem>
          <IonToast
            isOpen={this.state.show}
            onDidDismiss={() => this.handleToast()}
            message={fieldTitle}
            duration={3000}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default NameRoom;

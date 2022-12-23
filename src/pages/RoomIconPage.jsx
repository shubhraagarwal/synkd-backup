import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";
import { bedSharp, fastFoodOutline, maleFemaleOutline } from "ionicons/icons";
import { FaShower } from "react-icons/fa";
import "./LoginPage.css";
import { withRouter } from "react-router-dom";

class RoomIcon extends React.Component {
  refreshPage() {
    window.location.reload();
  }

  bedfn() {
    localStorage.setItem("Ricon", JSON.stringify("bedSharp"));
    this.props.history.push({ pathname: "/NameRoom" });
    this.refreshPage();
  }
  kitchenfn() {
    localStorage.setItem("Ricon", JSON.stringify("fastFoodOutline"));
    this.props.history.push({ pathname: "/NameRoom" });
    this.refreshPage();
  }
  showerfn() {
    localStorage.setItem("Ricon", JSON.stringify("maleFemaleOutline"));
    this.props.history.push({ pathname: "/NameRoom" });
    this.refreshPage();
  }

  render() {
    return (
      <IonPage>
        <IonLabel className="icon-label">Pick an icon</IonLabel>
        <IonGrid className="icon-grid">
          <IonRow className="icon-row">
            <IonCol className="icon-col">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="medium"
                onClick={() => this.bedfn()}
              >
                <IonIcon
                  icon={bedSharp}
                  size="large"
                  className="io-icon"
                ></IonIcon>
              </IonButton>
              <IonLabel className="icon_label1">Bedroom</IonLabel>
            </IonCol>
            <IonCol className="icon-col">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="medium"
                onClick={() => this.kitchenfn()}
              >
                <IonIcon
                  icon={fastFoodOutline}
                  size="large"
                  className="io-icon"
                ></IonIcon>
              </IonButton>
              <IonLabel>Kitchen</IonLabel>
            </IonCol>
            <IonCol className="icon-col">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="medium"
                onClick={() => this.showerfn()}
              >
                <IonIcon
                  icon={maleFemaleOutline}
                  size="large"
                  className="io-icon"
                />
              </IonButton>
              <IonLabel>Bathroom</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="icon-col">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="medium"
              >
                <FaShower className="shower-icon" />
              </IonButton>
            </IonCol>
            <IonCol className="icon-col">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="medium"
              >
                <FaShower className="shower-icon" />
              </IonButton>
            </IonCol>
            <IonCol className="icon-col">
              <IonButton
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="medium"
              >
                <FaShower className="shower-icon" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonPage>
    );
  }
}

export default withRouter(RoomIcon);

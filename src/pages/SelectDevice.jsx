import React from "react";
import {
  IonPage,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonItem,
  IonImg,
} from "@ionic/react";
import { hardwareChipOutline } from "ionicons/icons";
import "./SelectDevice.css";
import plug from "../images/power-plug.png";
import IR from "../images/IR.png";
import BottomNavBar from "./MainPage/BottomNavBar";

class SelectDevice extends React.Component {
  refreshPage() {
    window.location.reload();
  }

  BuilderChipFn() {
    this.props.history.push({ pathname: "/BuilderChip" });
  }
  render() {
    return (
      <IonPage>
        <IonHeader className="head">
          <IonToolbar>
            <IonTitle size="small">SELECT DEVICE TYPE</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="row_changes">
            <IonCol>
              <IonButton
                className="button_ion ion-no-padding"
                color="dark"
                size="large"
                fill="clear"
                onClick={() => this.BuilderChipFn()}
              >
                <IonIcon
                  className="icon_corner"
                  icon={hardwareChipOutline}
                ></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonItem lines="none" className="device-name">
            <IonLabel>Builder Chip</IonLabel>
          </IonItem>
          <IonRow className="row_changes">
            <IonCol>
              <IonButton
                className="button_ion ion-no-padding"
                color="dark"
                size="large"
                fill="clear"
              >
                <IonImg
                  style={{ height: "70px", width: "70px" }}
                  src={plug}
                ></IonImg>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonItem lines="none" className="device-name">
            <IonLabel>Smart Socket</IonLabel>
          </IonItem>
          <IonRow className="row_changes">
            <IonCol>
              <IonButton
                className="button_ion ion-no-padding"
                color="dark"
                size="large"
                fill="clear"
              >
                <IonImg
                  style={{ height: "90px", width: "90px" }}
                  src={IR}
                ></IonImg>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonItem lines="none" className="device-name">
            <IonLabel>IR Blaster</IonLabel>
          </IonItem>
        </IonGrid>
        <BottomNavBar />
      </IonPage>
    );
  }
}

export default SelectDevice;

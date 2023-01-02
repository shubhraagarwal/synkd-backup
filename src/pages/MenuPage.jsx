import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import { menuController } from "@ionic/core";
import { menuOutline } from "ionicons/icons";
import img1 from "../images/limg3.png";
//import "./Menu.css";

class Menu extends React.Component {
  EditProfilefn() {
    this.props.history.push({ pathname: "/EditProfile" });
  }

  onClickHandler = () => {
    menuController.close();
  };

  render() {
    return (
      <IonMenu
        side="start"
        menuId="sidemenu"
        content-id="menuContent"
        swipe-gesture={true}
        disabled={false}
        maxEdgeStart={100}
        hidden={false}
        type="overlay"
      >
        <IonHeader translucent>
          <IonToolbar color="primary">
            <IonTitle>
              <IonIcon slot="start" icon={menuOutline}></IonIcon>
            </IonTitle>
            <IonButtons slot="start">
              <IonMenuButton
                autoHide={true}
                onClick={() => this.onClickHandler()}
              ></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonList className="ion_list">
              <img
                alt="imagelogo"
                className="mx-auto rounded-circle Synkd_Logo"
                src={img1}
              ></img>
            </IonList>
            <h6 className="Name">Name</h6>
            <IonItem onClick={() => this.EditProfilefn()}>Edit Profile</IonItem>
            <IonItem>Settings</IonItem>
            <IonItem>Add New Home</IonItem>
            <IonItem>Order a device</IonItem>
            <IonItem>Add Users</IonItem>
            <IonItem>FAQs</IonItem>
            <IonItem>Contact Us</IonItem>
            <IonItem>Sign Out</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    );
  }
}

export default Menu;

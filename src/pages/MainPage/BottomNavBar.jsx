import React from "react";
import {
  IonSegmentButton,
  IonSegment,
  IonIcon,
  IonLabel,
  IonFooter,
  IonToolbar
} from "@ionic/react";
import {  gridSharp, homeSharp } from "ionicons/icons";
import robot from "../../images/device-icons/navBar/robot.svg"
// import house from "../../images/device-icons/navBar/home.svg"
import { withRouter  } from "react-router-dom";
import  "./BottomNavBar.css";

class BottomNavBar extends React.Component {
  OpenHome() {
 
  // if(window.location.pathname !== "/PHomePage")
  // {  this.props.history.push({ pathname: "/EHomePage" }); }

  this.props.selected({ComponentType: "HOME"});
  }

  OpenGroups(){
    console.log("Groups");
    //this.props.history.push({ pathname: "/Groups",  state:{showCreateGroupAlert: false}});
    this.props.selected({ComponentType: "GROUPS"});

  }
  OpenAutomation() {
    console.log("Automation");
    //this.props.history.push({ pathname: "/AutomationPage", state: {displayPage: "timers"} });
    this.props.selected({ComponentType: "AUTOMATION"});
  }

  render() {
    return (
      <IonFooter>
        <IonToolbar>
          <IonSegment value={this.props.value.ComponentType} mode="md" scrollable="false" swipeGesture="false">
            <IonSegmentButton
              value="HOME"
              type="button"
              onClick={() => this.OpenHome()}
            >
              <IonIcon icon={homeSharp} style={{ fontSize: "28px" }}></IonIcon>
              <IonLabel style={{ fontSize: "13px" }}>Home</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="GROUPS"
              type="button"
              onClick={() => this.OpenGroups()}
            >
              <IonIcon
                style={{ fontSize: "28px" }}
                icon={gridSharp}
              ></IonIcon>
              <IonLabel style={{ fontSize: "13px" }}>Groups</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="AUTOMATION"
              type="button"
              style={{ paddingLeft: "5px" }}
              onClick={() => this.OpenAutomation()}
            >
              <IonIcon
                style={{ fontSize: "28px" }}
                icon={robot}
              ></IonIcon>
              <IonLabel style={{ fontSize: "13px" }}>Automation</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    );
  }
}

export default withRouter(BottomNavBar);

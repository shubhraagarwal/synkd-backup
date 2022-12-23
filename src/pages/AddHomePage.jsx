import React from "react";
import "./LoginPage.css";
import { withRouter } from "react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonToast,
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import "@codetrix-studio/capacitor-google-auth";

var fieldTitle = "";
var name = "";
var userId = "";
var SocialApp = "";
var token = "";

const INITIAL_STATE = {
  loggedIn: true,
  user: {},
};

class AddHomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homename: "",
      ...INITIAL_STATE,
    };

    this.currentPathname = null;
    this.currentSearch = null;
  }

  CreateHomeFn() {
    this.props.history.push({ pathname: "/NameHomePage" });
  }

  async componentDidMount() {
    fieldTitle = "Login Successful";
    this.handleToast();
    name = JSON.parse(localStorage.getItem("Name"));
    userId = JSON.parse(localStorage.getItem("UserId"));
    token = JSON.parse(localStorage.getItem("token"));
    SocialApp = JSON.parse(localStorage.getItem("SocialApp"));
    console.log(name);

    if (SocialApp === "Facebook") {
      this.getUserInfo();
      this.setState({
        name: name,
      });
    }
    if (SocialApp === "Google") {
      this.setState({
        name: name,
      });
    } else {
      this.setState({
        name: name,
      });
    }

    const { history } = this.props;

    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (
          newLocation.pathname !== this.currentPathname ||
          newLocation.search !== this.currentSearch
        ) {
          // Save new location
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;

          // Clone location object and push it to history
          history.push({
            pathname: newLocation.pathname,
            search: newLocation.search,
          });
        }
      } else {
        // Send user back if they try to navigate back
        history.go(1);
      }
    });
  }

  async getUserInfo() {
    const response = await fetch(
      `https://graph.facebook.com/${userId}?fields=id,name,gender,link&type=large&access_token=${token}`
    );
    const myJson = await response.json();
    localStorage.setItem("Name", JSON.stringify(myJson.name));
    console.log(response);
    console.log(myJson);
    this.setState({
      name: myJson.name,
    });
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    console.log(this.state.name);
    return (
      <IonPage className="ion_page">
        <IonContent className="ion-content">
          <IonList className="ion_list">
            <img
              alt="my-img"
              className="mx-auto rounded-circle Synkd_Logo"
              src={require("../images/synkd_logo_white.JPG")}
            ></img>
          </IonList>
          <IonItem lines="none">
            <IonLabel className="ion-text-wrap ion_label1">
              Hi {this.state.name}! <br /> Please choose from the below options
            </IonLabel>
          </IonItem>
          <IonItem lines="none" className="loginbtn_item">
            <IonButton
              className="login_btn"
              shape="round"
              size="default"
              color="medium"
              onClick={() => {
                this.CreateHomeFn();
              }}
            >
              Create a New Home
            </IonButton>
          </IonItem>
          {/* <IonGrid className="login_grid">
            <IonRow>
              <IonCol size="4" className="col_line">
                <hr
                  style={{
                    color: "grey",
                    backgroundColor: "grey",
                    height: 1,
                  }}
                ></hr>
              </IonCol>
              <IonCol className="col_or" size="1.7" style={{ color: "black" }}>
                OR
              </IonCol>
              <IonCol size="4" className="col_line2">
                <hr
                  style={{
                    color: "grey",
                    backgroundColor: "grey",
                    height: 1,
                  }}
                ></hr>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItem lines="none" style={{ paddingTop: "2.5rem" }}>
            <IonButton
              className="login_btn"
              shape="round"
              size="default"
              color="medium"
            >
              Join A Home
            </IonButton>
          </IonItem> */}
          <IonToast
            isOpen={this.state.show}
            onDidDismiss={() => this.handleToast()}
            message={fieldTitle}
            duration={2000}
            keyboardClose="true"
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(AddHomePage);

import React from "react";
import "./RegisterPage1.css";
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
  IonButton,
  IonGrid,
  IonImg,
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import "@codetrix-studio/capacitor-google-auth";

const INITIAL_STATE = {
  loggedIn: false,
};

const GINITIAL_STATE = {};

class RegisterPage1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      ...GINITIAL_STATE,
    };
  }

  responseFacebook = (response) => {
    console.log(response);
  };

  componentClicked = () => console.log("clicked");

  async fbSignIin() {
    const FACEBOOK_PERMISSIONS = ["public_profile", "email"];

    const result = await Plugins.FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });
    console.info("result", result);
    if (result && result.accessToken) {
      console.info("token", result.accessToken);
      localStorage.setItem("UserId", JSON.stringify(result.accessToken.userId));
      localStorage.setItem("fbtoken", JSON.stringify(result.accessToken.token));
      this.props.history.push({
        pathname: "/AddHomePage",
        state: {
          token: result.accessToken.token,
          userId: result.accessToken.userId,
        },
      });
    }

    console.log(result);
  }

  async getCurrentState() {
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();

    try {
      console.log(result);
      return result && result.accessToken;
    } catch (e) {
      return false;
    }
  }

  async GsignIn() {
    const result = await Plugins.GoogleAuth.signIn();
    console.info("result", result);
    if (result) {
      this.props.history.push({ pathname: "/AddHomePage" });
    }
    localStorage.setItem("Name", JSON.stringify(result.displayName));
    localStorage.setItem(
      "Gtokens",
      JSON.stringify(result.authentication.idToken)
    );
    console.log(this.state);
  }

  SignUpFn() {
    this.props.history.push({ pathname: "/SignUpPage" });
  }

  render() {
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
          <IonItem lines="none" className="loginbtn_item">
            <IonButton
              className="login_btn"
              buttonType="button"
              shape="round"
              size="default"
              onClick={() => this.SignUpFn()}
            >
              Sign Up with Email
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
          <div className="social_btns">
            <IonButton
              fill="clear"
              className="facebookbtn ion-no-padding"
              onClick={() => this.fbSignIin()}
            >
              <IonImg src={require("../images/fb3.png")}></IonImg>
            </IonButton>
            <IonButton
              fill="clear"
              className="googlebtn ion-no-padding"
              onClick={() => this.GsignIn()}
            >
              <IonImg src={require("../images/g3.png")}></IonImg>
            </IonButton>
          </div> */}
        </IonContent>
      </IonPage>
    );
  }
}

export default RegisterPage1;

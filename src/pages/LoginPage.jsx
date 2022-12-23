import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonGrid,
  IonImg,
  IonToast,
  IonTitle,
} from "@ionic/react";
import React from "react";
import "./LoginPage.css";
import img1 from "../images/synkd_logo_white.JPG";
import fbimg from "../images/fb3.png";
import gimg from "../images/g3.png";
import { Plugins } from "@capacitor/core";
import "@codetrix-studio/capacitor-google-auth";
import { withRouter } from "react-router";

var fieldTitle = "";
var app1 = "Facebook";
var app2 = "Google";
var username = "";
var homeid = "";

const INITIAL_STATE = {
  loggedIn: false,
};

const GINITIAL_STATE = {};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      userID: "",
      name: "",
      displayname: "",
      email: "",
      picture: "",
      homeid: "",
      ...INITIAL_STATE,
      ...GINITIAL_STATE,
    };
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  componentDidMount() {
    username = JSON.parse(localStorage.getItem("Name"));
    if (username) {
      fieldTitle = "Login with your registered Email ID";
      this.handleToast();
    }
  }

  refreshPage() {
    window.location.reload();
  }

  SignUpFn() {
    this.props.history.push({ pathname: "/RegisterPage" });
  }

  async fbSignIin() {
    const FACEBOOK_PERMISSIONS = ["public_profile", "email"];

    const result = await Plugins.FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });
    console.info("result", result);
    if (result && result.accessToken) {
      console.info("token", result.accessToken);
      localStorage.setItem("UserId", JSON.stringify(result.accessToken.userId));
      localStorage.setItem("token", JSON.stringify(result.accessToken.token));
      localStorage.setItem("SocialApp", JSON.stringify(app1));
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

  async GsignIn() {
    const result = await Plugins.GoogleAuth.signIn();
    console.info("result", result);
    localStorage.setItem("Name", JSON.stringify(result.displayName));
    localStorage.setItem(
      "token",
      JSON.stringify(result.authentication.idToken)
    );
    localStorage.setItem("SocialApp", JSON.stringify(app2));
    if (result) {
      this.props.history.push({ pathname: "/AddHomePage" });
    }

    console.log(this.state);
  }

  SignInSubmit() {
    let data = this.state;
    if (!this.state.username && !this.state.password) {
      fieldTitle = "Username and password fields cannot be empty";
      this.handleToast();
    } else {
      if (!this.state.username) {
        fieldTitle = "Email ID field cannot be empty";
        this.handleToast();
      }
      if (!this.state.password) {
        fieldTitle = "Password field cannot be empty";
        this.handleToast();
      }
      if (this.state.username && this.state.password) {
        var regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        var result = regex.test(this.state.username);
        if (result === false) {
          fieldTitle = "Please Enter a valid Email ID";
          this.handleToast();
        }
      }
    }
    console.log(data);
    if (result === true) {
      fetch("https://clickademy.in/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result
          .json()
          .then((resp) => {
            if (resp.message === "Authentication Successful") {
              /*On success, setting the user name in the local storage*/
              console.log(resp);
              console.log(resp.userid);
              let obj = this.state.username;
              
             

              if (resp.homeid !== null) {
                if(resp.homeid.length > 0){
                  localStorage.setItem("homeid", JSON.stringify(resp.homeid[0]));
                  localStorage.setItem("username", JSON.stringify(obj));
                  localStorage.setItem("firstname", JSON.stringify(resp.firstname));
                  localStorage.setItem("token", JSON.stringify(resp.token));
                  localStorage.setItem("userid", JSON.stringify(resp.userid));

                  this.props.history.push({ pathname: "/MainPage" });
                } else {
                  localStorage.setItem("username", JSON.stringify(obj));
                  localStorage.setItem("firstname", JSON.stringify(resp.firstname));
                  localStorage.setItem("token", JSON.stringify(resp.token));
                  localStorage.setItem("userid", JSON.stringify(resp.userid));

                  this.props.history.push({ pathname: "/AddHomePage" });
                }
                
              } 
              //this.props.history.push({ pathname: "/AddHomePage" });
              this.refreshPage();
            } else {
              fieldTitle = "Email ID or password is incorrect";
              this.handleToast();
            }
          })
          .catch((error) => {
            console.log("Invalid email or password", error);
          });
      });
    }
  }

  roomsExist() {
    var auth_token = JSON.parse(localStorage.getItem("token"));
    var data = this.state;
    fetch("https://clickademy.in/home/retrieve-rooms", {
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
          if (resp.rooms != null) {
            console.log(resp);
            /*On success, setting the user name in the local storage*/
            //this.props.history.push({ pathname: "/PHomePage" });
            //this.refreshPage();
            this.props.history.push({ pathname: "/MainPage" });
          } else {
            this.props.history.push({ pathname: "/EHomePage" });
            this.refreshPage();
          }
        })
        .catch((error) => {
          console.log("No rooms Available", error);
        });
    });
  }

  render() {
    return (
      <IonPage className="ion_page">
        <IonContent className="ion-content">
          <IonList className="ion_list">
            <img
              alt="my-img"
              className="mx-auto rounded-circle Synkd_Logo"
              src={img1}
            ></img>
          </IonList>
          <IonList className="ion_list">
            <IonItem className="email_field">
              <IonInput
                className="ion_input1"
                placeholder="Email ID"
                inputMode="email"
                maxlength="70"
                required="true"
                value={this.state.username}
                onIonChange={(data) => {
                  this.setState({ username: data.target.value });
                }}
              ></IonInput>
            </IonItem>
            <IonItem className="pwd_field">
              <IonInput
                className="ion_input1"
                placeholder="Password"
                type="password"
                inputMode="text"
                maxlength="50"
                required="true"
                value={this.state.password}
                onIonChange={(data) => {
                  this.setState({ password: data.target.value });
                }}
              ></IonInput>
            </IonItem>
            <IonItem lines="none" className="loginbtn_item">
              <IonButton
                className="login_btn"
                buttonType="button"
                shape="round"
                size="default"
                onClick={() => {
                  this.SignInSubmit();
                }}
              >Login
              </IonButton>
            </IonItem>
            <IonItem lines="none" className="ion_item">
              <IonTitle
                onClick={() => {
                  this.SignUpFn();
                }}
              >
                New User? Sign Up
              </IonTitle>
            </IonItem>
          </IonList>
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
              onClick={() => {
                this.fbSignIin();
              }}
            >
              <IonImg src={fbimg}></IonImg>
            </IonButton>
            <IonButton
              fill="clear"
              className="googlebtn ion-no-padding"
              onClick={() => this.GsignIn()}
            >
              <IonImg src={gimg}></IonImg>
            </IonButton>
          </div> */}
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

export default withRouter(LoginPage);

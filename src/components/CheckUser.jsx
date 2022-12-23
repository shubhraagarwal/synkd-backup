import React from "react";
import withSplashScreen from "./withSplashScreen";
import img1 from "../images/synkd_logo.png";
import { Plugins } from "@capacitor/core";
const { SplashScreen } = Plugins;

var token;
var page;
var username;

class CheckUser extends React.Component {
  constructor(props) {
    super(props);
    page = JSON.parse(localStorage.getItem("UPage"));
    // username = JSON.parse(localStorage.getItem("username"));
    token = JSON.parse(localStorage.getItem("token"));
    this.state = {
      loading: true,
    };
  }

  pageMoveHome() {
    window.location.href = "/MainPage";
  }

  pageMoveSignIn() {
    window.location.href = "/LoginPage";
  }

  render() {
    // SplashScreen.hide({ fadeOutDuration: 0 });
    console.log(token);
    // setTimeout(() => {
    if (token != null) {
      this.pageMoveHome();
    } else {
      console.log("No token.. Move to SignIn page");
      this.pageMoveSignIn();
    }
    // }, 500);

    return (
      <div className="splash-screen">
        {/* <div
          className="loader"
          style={{
            width: "250px",
            height: "220px",
            textAlign: "center",
            paddingTop: "5px",
          }}
        > */}
        <img
          alt="Synk'd"
          src={img1}
          className="loader"
          style={{ width: "240px", height: "210px" }}
        ></img>
        {/* </div> */}
      </div>
    );
  }
}

export default withSplashScreen(CheckUser);

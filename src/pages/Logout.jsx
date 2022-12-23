import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Plugins } from "@capacitor/core";
import "@codetrix-studio/capacitor-google-auth";

var sapp = "";

class Logout extends React.Component {
  componentDidMount() {
    sapp = JSON.parse(localStorage.getItem("SocialApp"));
  }

  Logoutfn(props) {
    if (sapp === "Facebook") {
      this.FbSignOut();
      window.localStorage.clear();
      window.location.href = "/CheckUser";
    } else if (sapp === "Google") {
      window.localStorage.clear();
      window.location.href = "/CheckUser";
    } else {
      window.localStorage.clear();
      window.location.href = "/CheckUser";
    }
  }

  async FbSignOut() {
    await Plugins.FacebookLogin.logout();
  }

  render() {
    return this.Logoutfn;
  }
}

export default Logout;

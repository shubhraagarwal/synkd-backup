import React, { useState } from "react";
import { IonLoading, IonButton, IonContent } from "@ionic/react";

const HomeLoading = () => {
  var auth_token = JSON.parse(localStorage.getItem("token"));
  var homeid = JSON.parse(localStorage.getItem("homeid"));

  const [showLoading, setShowLoading] = useState(true);

  var data = "homeid:" + homeid;
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
          this.props.history.push({ pathname: "/PHomePage" });
          this.refreshPage();
        } else {
          //this.props.history.push({ pathname: "/EHomePage" });
          //this.refreshPage();
        }
      })
      .catch((error) => {
        console.log("Invalid email or Wrong Password", error);
      });
  });

  setTimeout(() => {
    setShowLoading(false);
  }, 3000);

  return (
    <IonContent>
      <IonButton onClick={() => setShowLoading(true)}>Show Loading</IonButton>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={5000}
      />
    </IonContent>
  );
};

export default HomeLoading;

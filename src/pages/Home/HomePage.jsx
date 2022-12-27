import { IonPage, 
  IonIcon, 
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButton,
  IonButtons
 } from "@ionic/react";
import React from "react";
import "../LoginPage.css";
import { addCircle } from "ionicons/icons";
import SideMenuPage from "../SideMenuPage";
import BottomNavBar from "../MainPage/BottomNavBar";

const contentStyle = {
  height: "300px",
  justifyContent: "center",
  width: "300px",
};

var auth_token = "";
var homeid = "";
var data = "";

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homeid: "",
      loading: true,
      homename: "MY HOME"
    };
  }

  async componentDidMount() {
    localStorage.setItem("UPage", JSON.stringify("/EHomePage"));
    auth_token = JSON.parse(localStorage.getItem("token"));
    homeid = JSON.parse(localStorage.getItem("homeid"));
    this.setState({ homeid: homeid });
    this.setState({ loading: true });
    setTimeout(() => {
      this.roomsExist();
    }, 50);
  }

  refreshPage() {
    window.location.reload();
  }

  roomsExist() {
    data = this.state;
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
          if (resp.rooms.length !== 0) {
            console.log(resp);
            /*On success, setting the user name in the local storage*/
            this.props.history.push({ pathname: "/PHomePage" });
            this.refreshPage();
            console.log(resp);
          } else {
            this.props.history.push({ pathname: "/EHomePage" });
          }
        })
        .catch((error) => {
          console.log("Invalid email or Wrong Password", error);
        });
    });
  }

  IconFn() {
    this.props.history.push({ pathname: "/RoomIcon" });
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  nextfn() {
    this.props.history.push({ pathname: "/RoomIcon" });
    /*
     display: "flex",
      height: "150px",
      width: "150px",
      marginLeft: "7rem",
      marginTop: "13rem",
    */
  }

  render() {
    return (
      <IonPage>
            <IonHeader>
                  <IonToolbar>
                  <IonButtons slot="start">
                  <IonMenuButton menu="first"></IonMenuButton>
                  </IonButtons>
                  <IonTitle style ={{ paddingLeft : '6rem',}} slot="start">{this.state.homeid}</IonTitle>
                  </IonToolbar>
            </IonHeader>      
          <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <IonButton
            style={contentStyle}
            fill="clear"
            onClick={() => {
              this.IconFn();
            }}
          >
            <IonIcon
              color="dark"
              style={{ fontSize: "150px" }}
              icon={addCircle}
            ></IonIcon>
          </IonButton>
        </div>
        <BottomNavBar />
      </IonPage>
    );
  }
}

export default Homepage;

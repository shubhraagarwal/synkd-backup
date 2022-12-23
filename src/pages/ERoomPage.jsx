import { IonPage, IonIcon, IonButton } from "@ionic/react";
import React from "react";
import "./LoginPage.css";
import { addCircle } from "ionicons/icons";
import SideMenuPage from "./SideMenuPage";
import BottomNavPage from "./MainPage/BottomNavBar";

const contentStyle = {
  height: "300px",
  justifyContent: "center",
  width: "300px",
};

var auth_token = "";
var homeid = "";
var data = "";

class ERoomPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homeid: "",
      loading: true,
    };
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  refreshPage() {
    window.location.reload();
  }

  IconFn() {
    this.props.history.push({ pathname: "/SelectDevice" });
  }

  render() {
    return (
      <IonPage>
        <SideMenuPage />
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
        <BottomNavPage />
      </IonPage>
    );
  }
}

export default ERoomPage;

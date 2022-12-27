import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonGrid,
  IonCol,
  IonRow,
  IonMenu,
  IonHeader,
  IonButton,
  IonToolbar,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import React from "react";
import img1 from "../images/synkd_round.png";
import "./LoginPage.css";

class Home extends React.Component {
  LoginFn() {
    this.props.history.push({ pathname: "/LoginPage" });
  }

  SignUpFn() {
    this.props.history.push({ pathname: "/RegisterPage" });
  }

  render() {
    return (
      <IonPage>
        <IonContent className="ion_content">
          <IonList className="ion_list">
            <img
              alt="imagelogo"
              className="mx-auto rounded-circle Synkd_Logo"
              src={img1}
            ></img>
          </IonList>
          <IonItem lines="none" className="loginbtn_item">
            <IonButton
              className="login_btn"
              buttonType="button"
              shape="round"
              size="default"
              color="medium"
              onClick={() => {
                this.LoginFn();
              }}
            >
              Login
            </IonButton>
          </IonItem>
          <IonGrid className="login_grid">
            <IonRow classname="rowalign">
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
                Or
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
              buttonType="button"
              shape="round"
              size="default"
              color="medium"
              onClick={() => this.SignUpFn()}
            >
              Sign Up
            </IonButton>
          </IonItem>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;

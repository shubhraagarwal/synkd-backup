import {
  IonContent,
  IonPage,
  IonTitle,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/react";
import img1 from "../images/synkd_logo_white.JPG";
import "./SignUpPage.css";
import React from "react";

var fieldTitle = "";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      cpassword: "",
    };
  }

  SignInFn() {
    this.props.history.push({ pathname: "/LoginPage" });
  }

  refreshPage() {
    window.location.reload();
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  SignInSubmit() {
    let data = this.state;
    if (
      !this.state.username ||
      !this.state.firstname ||
      !this.state.lastname ||
      !this.state.password ||
      !this.state.cpassword
    ) {
      fieldTitle = "All fields are required";
      this.handleToast();
    } else {
      if (this.state.username) {
        var regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        var uresult = regex.test(this.state.username);
        if (uresult === false) {
          fieldTitle = "Please Enter a valid Email ID";
          this.handleToast();
        }
      }
      if (this.state.firstname) {
        var fregex = /^[a-zA-Z]+$/;
        var fresult = fregex.test(this.state.firstname);
        if (fresult === false) {
          fieldTitle = "Please Enter a valid Firstname";
          this.handleToast();
        }
      }
      if (this.state.lastname) {
        var lregex = /^[a-zA-Z]+$/;
        var lresult = lregex.test(this.state.lastname);
        if (lresult === false) {
          fieldTitle = "Please Enter a valid Lastname";
          this.handleToast();
        }
      }
      if (this.state.cpassword !== this.state.password) {
        var presult = false;
        fieldTitle = "Passwords do not match";
        this.handleToast();
      }else{ 
        if(this.state.password.length < 6){
        fieldTitle = "Password must be at least 6 characters in length.";
        this.handleToast();
      }else{presult = true;}
    }
    }
    if (fresult && lresult && uresult && presult) {
      console.log(data);
      fetch("https://clickademy.in/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result
          .json()
          .then((resp) => {
            if (resp.message === "Registration Successful") {
              //let obj = this.state.firstname;
              console.log(resp);
              console.log(this.state.firstname);
              localStorage.setItem(
                "Name",
                JSON.stringify(this.state.firstname)
              );

              this.props.history.push({ pathname: "/LoginPage" });
              this.refreshPage();
            } else {
              fieldTitle = "Registration Unsuccessful. "+resp.message!==undefined?resp.message:"";
              this.handleToast();
            }
          })
          .catch((error) => {
            console.log("Registration Unsuccessful", error);
          });
      });
    }
  }

  render() {
    return (
      <IonPage>
        <IonContent className="ion-content">
          <IonList className="ion_list">
            <img
              alt="imagelogo"
              className="mx-auto rounded-circle Synkd_Logo"
              src={img1}
            ></img>
          </IonList>
          <IonItem className="email_field">
            <IonInput
              className="ion_input1"
              placeholder="First name"
              inputMode="text"
              maxlength="70"
              required="true"
              value={this.state.firstname}
              onIonChange={(data) => {
                this.setState({ firstname: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem className="email_field">
            <IonInput
              className="ion_input1"
              placeholder="Last name"
              inputMode="email"
              maxlength="70"
              required="true"
              value={this.state.lastname}
              onIonChange={(data) => {
                this.setState({ lastname: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem className="email_field">
            <IonInput
              className="ion_input1"
              placeholder="Email ID"
              type="email"
              inputMode="email"
              maxlength="70"
              required="true"
              value={this.state.username}
              onIonChange={(data) => {
                this.setState({ username: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem className="email_field">
            <IonInput
              className="ion_input1"
              placeholder="Password"
              type="password"
              inputMode="email"
              maxlength="70"
              required="true"
              value={this.state.password}
              onIonChange={(data) => {
                this.setState({ password: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem className="email_field">
            <IonInput
              className="ion_input1"
              placeholder="Confirm Password"
              type="password"
              inputMode="email"
              maxlength="70"
              required="true"
              value={this.state.cpassword}
              onIonChange={(data) => {
                this.setState({ cpassword: data.target.value });
              }}
            ></IonInput>
          </IonItem>
          <div
            style={{
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonButton
              shape="round"
              size="default"
              color="dark"
              onClick={() => {
                this.SignInSubmit();
              }}
            >
              Sign Up
            </IonButton>
          </div>
          <IonItem lines="none">
            <IonTitle
              onClick={() => {
                this.SignInFn();
              }}
            >
              Already have an account? Sign In
            </IonTitle>
          </IonItem>
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

export default Signup;

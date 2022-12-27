import React from "react";
// import img1 from "../../images/limg3.png";
import {
  
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonHeader,
  IonTitle,
  IonIcon,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {closeOutline} from "ionicons/icons"
import  "./Settings.css";
import "../SignUpPage.css";

var fieldTitle = "";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldpassword: "",
      newpassword: "",
      cpassword: "",
      username: JSON.parse(localStorage.getItem("username")),
    };
  }

  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  NextFn() {
    var presult = false;
    fieldTitle = "";
    if (
          !this.state.oldpassword ||
          !this.state.newpassword ||
          !this.state.cpassword
        ) 
    {
      fieldTitle = "All fields are required";
      this.handleToast();
    } else {
      if (this.state.cpassword !== this.state.newpassword) {
        fieldTitle = "Passwords do not match";
        this.handleToast();
      } else {
        if(this.state.newpassword.length < 6){
          fieldTitle = "Password must be at least 6 characters in length.";
          this.handleToast();
        }else{presult = true;}
      }
    }
    var data = this.state;
    if (presult === true) {
      console.log("state:"+JSON.stringify(data));
      fetch("https://clickademy.in/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
      
        if(result.status === 200){
        result.json()
          .then((resp) => {
              
              console.log(resp);
              fieldTitle = resp.message;
              this.handleToast();
              this.props.onDidDismiss(true);
           
          }).catch((error) => {
            
            console.log("Json parse error", error);
            fieldTitle = "Server Error.";
              this.handleToast();
          });
        }else{
          console.log(result);
          result.json().then((res) =>{
            console.log(res.message);
        
            fieldTitle = res.message===undefined?"Server Issue.":res.message;
            this.handleToast();
            
          });
          
        }
       

      });
    }
  }

  render() {
    return (
        <IonContent>
          
          <IonHeader className="ion-no-border">

            <IonToolbar mode="ios">
            <IonTitle slot="secondary" >Change Password</IonTitle>
            <IonButton slot="end" size="large"  fill="clear"
            onClick={() => this.props.onDidDismiss(true)}>
            <IonIcon icon={closeOutline} color="dark"></IonIcon>
            </IonButton>
            </IonToolbar>
           
            
           
          <p className="desc">
           Please enter the following details
          </p>
       
          </IonHeader>
          <IonItem className="email_field">
            <IonInput
              style={{ marginTop: "3rem" }}
              className="ion_input1"
              placeholder="Old Password"
              type="password"
              inputMode="email"
              maxlength="70"
              required="true"
              value={this.state.oldpassword}
              onIonChange={(data) => {
                this.setState({ oldpassword: data.target.value });
                console.log(this.state.oldpassword);
              }}
            ></IonInput>
          </IonItem>
          <IonItem className="email_field">
            <IonInput
              className="ion_input1"
              placeholder="New Password"
              type="password"
              inputMode="email"
              maxlength="70"
              required="true"
              value={this.state.newpassword}
              onIonChange={(data) => {
                this.setState({ newpassword: data.target.value });
                console.log(this.state.newpassword);
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
                console.log(this.state.cpassword);
              }}
            ></IonInput>
          </IonItem>
          
            <IonButton
              className="button_change_pwd"
              buttonType="button"
              shape="round"
              size="default"
              color="dark"
              onClick={() => {
                this.NextFn();
              }}
            >
              Change Password
            </IonButton>
           <IonToast
            isOpen={this.state.show}
            onDidDismiss={() => this.handleToast()}
            message={fieldTitle}
            duration={3000}
          /> 
        </IonContent>
      
    );
  }
}

export default ProfileSettings;

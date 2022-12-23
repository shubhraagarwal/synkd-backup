import React from "react";
import {
    IonItem,
    IonToolbar,
    IonContent,
    IonInput,
    IonTitle,
    IonHeader,
    IonButton,
    IonIcon,
    IonToast
      } from "@ionic/react";
  import { hardwareChip, closeOutline } from "ionicons/icons";
  import "./BuilderChipSetupName.css";
import { createSwitchController } from "../ServerRequests/globalApi";



var toastMsg="";


class BuilderChipSetupName extends React.Component{


    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            name: "",
            showToast: false,
            mac: this.props.mac,
            roomid: this.props.roomid,
            slotCount: this.props.slotCount === undefined?8:this.props.slotCount
        }
    }

    componentWillReceiveProps(props){
            console.log(props);
            this.setState({mac: props.mac, roomid: props.roomid, slotCount: props.slotCount});
    }

    handleToast() {
      this.setState({
        showToast: true
      });
    }

   async NextFn(){
        if (!this.state.name){
            toastMsg = "Name field cannot be left empty.";
            this.handleToast();
        }else{

            var data = JSON.stringify({mac: this.state.mac, roomid: this.state.roomid, name: this.state.name, slotcount: this.state.slotCount, state: 255 });
            const response = await createSwitchController(data);

            if(response !== undefined){
                console.log(response[0]);
                switch(response[0].status){
          
                  case 200:
                      toastMsg = "Chip setup successful.";
                      this.handleToast();
                      this.props.onDidDismiss(true);
                      
                      break;

                  case 500:
                    toastMsg = "Server Error. Try again later.";
                    this.handleToast();
                    break;

                      default:
                        toastMsg = "Could not reach server. Are you sure you're connected to the internet?";
                        this.handleToast();
                        break;
                }
            }

        }
    }


    handleToast(){
        this.setState({showToast: true});

    }




    render(){
        return(
        <IonContent>
           <IonHeader className="ion-no-border">

           <IonToolbar mode="ios">
            <IonTitle slot="secondary">BUILDER CHIP SET-UP</IonTitle>
            <IonButton slot="end" size="large"  fill="clear"
            onClick={() => this.props.onDidDismiss(true)}>
            <IonIcon icon={closeOutline} color="dark"></IonIcon>
            </IonButton>
            </IonToolbar>

            <p className="desc">
              Now, turn on your internet and enter the name for the chip being set up. For example 'Bedside', 'Foyer' or any other name that is relevant.
            </p>
          </IonHeader>
         
          <IonButton
                className="button_icon"
                color="light"
                fill="clear"
              >
                <IonIcon className="icon"  icon={hardwareChip}></IonIcon>
              </IonButton>
              <IonItem  className="input">
                <IonInput
                style={{ color: "black" }}
                placeholder="Chip Name"
                type="text"
                inputMode="text"
                maxlength="50"
                required="true"
                value={this.state.name}
                onIonChange={(data) => {
                  this.setState({ name: data.target.value });
                }}
              ></IonInput>
              </IonItem>
              <IonButton
                className="button_start"
                buttonType="button"
                shape="round"
                size="default"
                
                onClick={() => this.NextFn()}
              >
                Start
              </IonButton>
            

            
         

          <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({showToast: false})}
            message={toastMsg}
            duration={3000}
          />
          </IonContent>);
    }
}

export default BuilderChipSetupName;
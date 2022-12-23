/* This is the home page with rooms populated */

import {
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonSkeletonText,
  IonModal,
  IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
    IonRefresher,
    IonRefresherContent
} from "@ionic/react";
import React from "react";
import "../LoginPage.css";
import "./HomePage.css";
import { personCircleSharp, addOutline } from "ionicons/icons";
import { withRouter } from "react-router";
import { retrieveRooms, retrieveSwitchControllers } from "../ServerRequests/globalApi";
import DisplayIconComponent from "../MiscUiComponents/DisplayIconComponent";
import SetupRoomModalComponentHolder from "./SetupRoomModalComponentHolder";
import {retrieveSlots } from "../ServerRequests/globalApi";
import SideMenuOptionsComponentHolder from "../MiscUiComponents/SideMenuOptionsComponentHolder";


var auth_token;
var toastMsg = "";

const contentStyle = {
  height: "90px",
  justifyContent: "center",
  width: "90px",
};

class PHomepage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    auth_token = JSON.parse(localStorage.getItem("token"));
    this.state = {
      homeid: "",
      rname: "",
      ricon: "",
      roomid: "",
      homename: "MY HOME",
      items: [],
      rooms: [],
      showSetupRoomModal: false,
      showSideMenuOptionsModal: false
    };
  }

  componentDidMount() {
    this._isMounted = true;

    var home_id = JSON.parse(localStorage.getItem("homeid"));
    
    var homeData = JSON.parse(localStorage.getItem(home_id));
    if(homeData !== null){
    this.setState({ items: homeData.rooms, 
      homename: homeData.homename,
      rooms: homeData.rooms,
      loading: false});
    }

    this.getRoomInfo();
 
   
  }



  componentWillUnmount() {
    this._isMounted = false;
 }



  handleToast() {
    this.setState({
      show: !this.state.show,
    });
  }

  refresh(event){
    this.setState({loading: true});
    this.getRoomInfo(); 

    if(event !== undefined){
      if(event.target !== undefined){
        setTimeout(() =>{
          event.target.complete()
          }, 800);
      }
    }
  }
  



  async LoadChips(roomid){

    var data = JSON.stringify({roomid: roomid});
    let response = undefined
    try{
      response = await retrieveSwitchControllers(data);
    }catch(e){
      console.log(e)
    }
  
    
    if(response !== undefined){
      console.log(response[0]);
      switch(response[0].status){

        case 200:
         
            if(response[0].data.switchControllers.length > 0){
            localStorage.setItem(roomid, JSON.stringify(response[0].data.switchControllers));


            for(var i=0; i<response[0].data.switchControllers.length; i++ )
            {localStorage.setItem(response[0].data.switchControllers[i].mac,
               JSON.stringify(response[0].data.switchControllers[i]));}



            //Save chip data if not available   
            var chips = JSON.parse(localStorage.getItem(roomid));
            console.log(chips);
             
            for(var i=0; i<chips.length; i++)
            {
                var chipData = JSON.parse(localStorage.getItem(chips[i]));
                if(chipData === null){this.getChipData(chips[i].mac);}
              
            }


            }
            
        break;



        default:
          toastMsg = "Could not retrieve chips from server.";
          this.handleToast();
        break;
    }
    
  
}
}





async getChipData(mac){
      
  var data = JSON.stringify({mac: mac});
  console.log("Attempting to get chip data of "+mac);

  

  const response = await retrieveSlots(data);

  if(response !== undefined){
    console.log(response[0].data.error);
    switch(response[0].status){

      case 200:
          var resp = response[0].data;
          console.log(response[0].data);
          try{
          localStorage.setItem(JSON.stringify({mac: resp}));
          }
          catch{}
          console.log("Attempt to retrieve chip data from cloud sucessful.");

          // this.websocketfn();
        break;

        default:
          console.log("Could not retrieve chip data from cloud.");
          break;
        }
      }else{console.log("Could not retrieve chip data from cloud.");}
      
  
}





  NewRoomFn() {
    this.setState({ showSetupRoomModal: true });
  }

  displayfn(item)
  {this.props.component({ComponentType: "HOME", 
  ComponentProperties: {roomname: item.roomname, roomid: item._id, subcomponent: "ROOM"}});}

  async getRoomInfo() {
    var home_id = JSON.parse(localStorage.getItem("homeid"));

    // this.setState({ loading: true});
    let data = JSON.stringify({homeid: home_id});

    const response = await retrieveRooms(data);
    //console.log(data);
    if(response !== undefined){
      switch(response[0].status){

        case 200:
          this.setState({ items: response[0].data.rooms, 
                          homename: response[0].data.homename,
                          rooms: response[0].data.rooms,
                          loading: false});
          console.log(response[0].data);
          localStorage.setItem(home_id, JSON.stringify(response[0].data));
          for(var i=0; i<this.state.rooms.length;i++ )
          {this.LoadChips(this.state.rooms[i]._id);
            console.log(this.state.rooms[i]._id+" -> "+this.state.rooms[i].roomname);    

          }

          
          break;

        default:
          toastMsg = "Home not created";
            this.handleToast();
            this.setState({loading: false});
          break;


      }

    }else{
    toastMsg = "Home not created";
    this.handleToast();
    this.setState({loading: false});
  }
 
  }

  render() {

    let btn=[];
    let loading = this.state.loading;
    let body;
    if(loading){
     
       
        for(var j=0; j<10;j++){
           btn.push(<IonCol className="phome-col ion-align-self-center" size="4" >
                        <IonButton 
                        fill="clear"
                        size="large"
                        expand="block">
                        <IonSkeletonText animated style={{   width: "70px", height: "70px" }}/>
                        </IonButton>  
                          
                          <IonSkeletonText animated style={{margin: '25%', width: '50%' }} />
                      </IonCol>);
        }
      
      body=(<IonGrid className="phome-grid">
                <IonRow className="phome-row">
                  {btn}
                </IonRow>
            </IonGrid>);

    }else{  body=(<IonGrid className="phome-grid">
                    <IonRow className="phome-row">
                      {this.state.items.map((item) => {
                        return (
                          <IonCol className="phome-col ion-align-self-center" size="4">
                            <IonButton
                              fill="solid"
                              className="roomBtn ion-no-padding"
                              shape="round"
                              size="large"
                              expand="block"
                              color="light-tint"
                              id={item._id}
                              onClick={() => this.displayfn(item)}>
                              <DisplayIconComponent
                                icon={item.iconname}
                                size="large"
                                className="io-icon"
                              />
                            </IonButton>
                            <br />
                            <IonLabel className="icon_label1">{item.roomname}</IonLabel>
                          </IonCol>
                        );
                      })}

                    <IonCol className="phome-col ion-align-self-center" size="4">
                      <IonButton
                        fill="solid"
                        className="roomBtn ion-no-padding"
                        shape="round"
                        size="large"
                        color="dark"
                        onClick={() =>this.NewRoomFn()}>
                        <IonIcon
                          icon={addOutline}
                          className="addBtnIcon"
                          />
                      </IonButton>
                      <br />
                      <IonLabel className="icon_label1">Add Room</IonLabel>
                    </IonCol>
              </IonRow>
            </IonGrid> );
    }



    return (
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(event) => this.refresh(event)} >
                     <IonRefresherContent />
                </IonRefresher>

            <IonHeader class="ion-no-border">
                 <IonToolbar  mode="ios" >
                  <IonButtons slot="start">
                  <IonMenuButton menu="first"
                                fill="solid"
                                className="icon-btn ion-no-padding"
                                shape="round"
                                size="large"
                                expand="block"
                                color="medium"
                                icon="">
                                      <IonIcon
                                        icon={personCircleSharp}
                                        size="large"
                                        className="io-icon"
                                      ></IonIcon>
                                </IonMenuButton>
                  
                  </IonButtons>
                  <IonTitle slot="secondary">{this.state.homename}</IonTitle>
                  </IonToolbar>
            </IonHeader> 
            {body} 

            <IonModal
            isOpen={this.state.showSetupRoomModal}>
                <SetupRoomModalComponentHolder
                component={{ ComponentType: 1}}
                onDidDismiss={() => {this.setState({showSetupRoomModal: false}); this.refresh();} }/>
            </IonModal>

            <IonModal
              isOpen={this.state.showSideMenuOptionsModal}>
                <SideMenuOptionsComponentHolder
                component={{componentType: "PROFILE_SETTINGS"}}
                onDidDismiss={() => {this.setState({showSideMenuOptionsModal: false});}}
                />
              </IonModal>

             

     </IonContent>
    );
  }
}

export default withRouter(PHomepage);


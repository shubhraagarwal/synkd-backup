import React from "react";

import { IonContent, IonToast, IonToolbar, IonButton, IonTitle, IonIcon, IonModal, IonHeader } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { withRouter  } from "react-router-dom";
import GroupGrid from "../../Groups/UI/GroupGrid"
import {addToGroup} from "../../ServerRequests/globalApi"



class AddToGroupModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      groups: [],
      groupsLoaded: false,
      showToast: false,
      toastMsg: ""
    }
  }


  async addToGroup(groupid, mac, slotnumber){
    console.log("Slotnumber:"+slotnumber);
    var data = JSON.stringify({groupid: groupid, mac: mac, slotnumber: slotnumber});


    const response = await addToGroup(data);
    if(response !== undefined){
      console.log(response);
      switch(response[0].status){

        case 200:
        
        this.props.onDidDismiss(true, "Device added to group.");
        break;

        case 409:
          this.setState({showToast: true,
             toastMsg: "Group has selected device. Pick another one."});
          break;

          default:
            this.setState({showToast: true,
              toastMsg: "Server Error."});
            break;

      }

      
      } else{console.log("Could not add device to group"); this.props.onDidDismiss(false, "Could not add device to group");}


    
  }

  
  


render(){
   

   
    let mac = this.props.mac;
    let slotnumber= this.props.slotnumber;
    
    
    return(
        <IonModal
        isOpen={this.props.isOpen}
        swipeToClose={true}
        onDidDismiss={() => this.setState(() => ({isOpen: false, groupsLoaded: false}) )}
        style={{  height: "30px", width: "100%", paddingTop: "5px" }}>
         <IonHeader class="ion-no-border">
                 <IonToolbar  mode="ios" >
                  <IonButton slot="start"
                             fill="clear"
                             color="dark"
                             onClick={() => this.props.onDidDismiss(false, "")}
                             >
        
                            <IonIcon
                              icon={arrowBack}
                              size="medium"
                             />
                  
                  </IonButton>
                  <IonTitle slot="secondary">PICK A GROUP</IonTitle>
                  </IonToolbar>
            </IonHeader>
       
        <IonContent>
          <GroupGrid 
            isShortPressed={(group) => this.addToGroup( group._id, mac, slotnumber)}
            isLongPressed={() =>{}}
            groups={() =>this.setState(() =>({groupsLoaded: true})) }
            reload={!this.state.groupsLoaded}
            shouldSetState={false}
            didSetState={()=>{}}
            isRetrievingState={()=>{}}
            />
        </IonContent>
        <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => {this.setState(() => ({showToast: false}))}}
            message={this.state.toastMsg}
            duration={3000}
          />
    </IonModal>
    );
    
    

}


}

export default withRouter(AddToGroupModal);
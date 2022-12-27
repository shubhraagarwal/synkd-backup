import React from "react";

import { IonContent,
        IonToast,
        IonIcon,
        IonModal,
        IonCol,
        IonLabel,
        IonGrid,
        IonHeader,
        IonButton,
        IonRow ,
        IonAlert,
        IonTitle,
        IonToolbar} from "@ionic/react";
import { withRouter  } from "react-router-dom";
import {closeOutline} from "ionicons/icons"
import {removeSlotFromGroup, retrieveSlots} from "../../ServerRequests/globalApi";
import DisplayIconComponent from "../../MiscUiComponents/DisplayIconComponent";
import  "./EditGroupModal.css";


class EditGroupModal extends React.Component{


  

    constructor(props){
        super(props);
        this.state={
          slots: [],
          slotsLoaded: false,
          showToast: false,
          toastMsg: "",
          groupname: "",
          slotToRemove: "",
          deleteAlert: false
        }

      
      }


      async removeFromGroup(){

        var data = JSON.stringify({ mac: this.state.slotToRemove.mac, 
                                    slotnumber: this.state.slotToRemove.slotnumber, 
                                    groupid: this.state.slotToRemove.groupid});

        const response = await removeSlotFromGroup(data);

        if(response != undefined){

          switch(response[0].status){

            case 200:
              this.setState({
                showToast: true,
                toastMsg: "Device Removed from Group.",
                slotsLoaded: false
              });
              this.props.onDidDismiss(true);
              break;

            default:
              this.setState({
                showToast: true,
                toastMsg: "Server Error"
              });
              break;

          }

        }else{
          this.setState({
            showToast: true,
            toastMsg: "Internet Error"
          });
        }


      }


      async getSlotsInfo() {
        var group = this.props.group;
        for(var i=0; i<group.slots.length; i++){

          var data = JSON.stringify({mac: group.slots[i].mac});
  
              const response = await retrieveSlots(data);
        
              if(response !== undefined){
                console.log("resp len:"+response[0].data.length);
                switch(response[0].status){
          
                  case 200:
                        var slots = this.state.slots;
                        var slot;
                        
                          

                          for(var j=0; j<response[0].data.slots.length; j++)
                          {
                            if(group.slots[i].slotnumber === response[0].data.slots[j].slotnumber){
                                slot={
                                    mac: group.slots[i].mac,
                                    slotnumber: response[0].data.slots[j].slotnumber,
                                    slotname: response[0].data.slots[j].slotname,
                                    sloticon: response[0].data.slots[j].sloticon
                                    }

                                slots.push(slot);

                            }
                          }
                          
                        


                      
                       
                        this.setState({ slots: slots, 
                          groupname: group.name,
                          slotsLoaded: true });
                        /*On success, setting the homeid in the local storage*/
                  
                        console.log(response[0].data);
                        break;
        
                        default:
                          console.log(response[0].status);

                          this.setState({
                            showToast: true,
                            toastMsg: "Server Error.",
                            slotsLoaded: true
                          });
                            this.props.slots([]);
              
                          break;
              
            
                  
              }
            }
          }
    }



    render(){

      
      let slots = this.state.slots;
      let groupid =this.props.group._id
      let slotArr = []
      if(!this.state.slotsLoaded)
      {this.getSlotsInfo();}
      else{
      for(var i=0; slots.length > i; i++){
        var item = slots[i];
          slotArr.push(
            <IonCol className="phome-col ion-align-self-center" size="4">
                             <IonButton
                               className="no-glow-btn ion-no-padding"
                               shape="round"
                               size="large"
                               expand="block"
                               id={item.slotnumber}//id={item._id}
                               color="light-tint"
                               onClick={() => this.setState({slotToRemove: {slotnumber: item.slotnumber,
                                                                            mac: item.mac,
                                                                            groupid: groupid},
                                                             deleteAlert: true   })}
                             
                             >
                               <DisplayIconComponent
                                 icon={item.sloticon}
                                 color="light"
                                 size="large"
                                 className="io-icon"
                               ></DisplayIconComponent>
                             </IonButton>
                             <br />
                             <IonLabel className="icon_label1">{item.slotname}</IonLabel>
                             
                             </IonCol>
          );
      }
    }

        return(
            <IonModal
            isOpen={this.props.isOpen}
            swipeToClose={true}
            onDidDismiss={() => this.setState(() => ({isOpen: false}) )}
            style={{  height: "30px", width: "100%", paddingTop: "5px" }}>
                     <IonHeader className="ion-no-border">

            <IonToolbar mode="ios">
            <IonTitle slot="secondary" class="ion-padding"> VIEW/REMOVE DEVICES:<br/> {this.props.group.name}</IonTitle>
            <IonButton slot="end" size="large"  fill="clear"
            onClick={() => this.props.onDidDismiss(false)}>
            <IonIcon icon={closeOutline} color="dark"></IonIcon>
            </IonButton>
            </IonToolbar>



            <p className="desc">
            Select the device you would like to remove from this group
            </p>

            </IonHeader>
            
            <IonContent>

            <IonGrid className="phome-grid" color="medium">
            <IonRow className="phome-row">
             {slotArr}
   
             </IonRow>
             </IonGrid>
              
            </IonContent>
            <IonAlert
                        isOpen={this.state.deleteAlert}
                        onDidDismiss={() => this.setState({deleteAlert: false})}
                        header={'Alert'}
                        message={'Are you sure you want to remove this device from the group?'}
                         buttons={[
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                              this.setState({deleteAlert: false})
                            }
                          },
                          {
                            text: 'Ok',
                            handler: () => {
                              this.removeFromGroup()
                            }
                          }
                        ]}/>
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

export default withRouter(EditGroupModal);
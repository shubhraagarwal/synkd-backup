import { trash, pencilSharp, timerSharp, calendarSharp } from "ionicons/icons";
import React from "react";
import { 
  IonTitle,
  IonIcon,
  IonItem,
  IonPopover,
  IonList,
  IonLoading,
  IonAlert
 

} from "@ionic/react";

import EditGroupModal from "./EditGroupModal";
import { deleteGroup } from "../../ServerRequests/globalApi";
import { withRouter } from "react-router";




class LongPressPopover extends React.Component{

  constructor(props) {
    super(props);

    this.state={
      showEditGroupModal: false,
      isOpen: true,
      loading: false,
      deleteAlert: false,
      toDeleteID: ""
    }
  }




async deleteGroup(){


      var homeid = JSON.parse(localStorage.getItem("homeid"));
      var data = JSON.stringify({homeid: homeid, groupid: this.state.toDeleteID});
      const response = await deleteGroup(data);

      if(response[0] !== undefined){

        switch(response[0].status){

            case 200:
              this.setState({loading: false, isOpen: false});
              break;

            default:
              this.setState({loading: false});
              break;
        }

      }else{  this.setState({loading: false});}
        
}


setTimer(){
  var slots = [];
  this.props.group.slots.forEach(element => {
    slots.push(element);
  }); 
  this.props.component({ ComponentType: "AUTOMATION" , 
  ComponentProperties:{ displayPage: "timers", showTimSetAlert: slots, name: this.props.group.name}});
}



setSchedule(){
  var slots = [];
  this.props.group.slots.forEach(element => {
    slots.push(element);
  }); 
  this.props.component({ ComponentType: "AUTOMATION" , 
  ComponentProperties:{ displayPage: "schedules", showSchSetAlert: slots, name: this.props.group.name}});
  console.log("G SLots"+JSON.stringify(slots));
}




render(){
let item = this.props.group;

    return(       <div>
                      {/* <IonLoading
                        isOpen={this.state.loading}
                        onDidDismiss={() => this.setState({loading: false})}
                        message={'Please Wait...'}/> */}

                    <IonPopover
                           mode="md"
                           isOpen={this.state.isOpen}
                           onDidDismiss={() => {this.props.onDidDismiss()}}
                        >
                          <IonTitle style={{margin: "0.5em"}}>{item.name} options</IonTitle>
                          <IonList style={{padding: "0.5em"}}>
                            
                              

                            <IonItem
                            button onClick={() => this.setState({showEditGroupModal: true})}
                            >
                              <IonIcon
                                icon={pencilSharp}
                                size="large"
                                className="io-icon"
                              ></IonIcon>
                              <p style={{padding: "0.5em"}}>Edit</p>
                            </IonItem>

                            <IonItem
                            button onClick={this.setTimer.bind(this, item.groupid)}
                            >
                              <IonIcon
                                icon={timerSharp}
                                size="large"
                                className="io-icon"
                              ></IonIcon>
                               <p style={{padding: "0.5em"}}>Set Timer</p>
                            </IonItem>

                            <IonItem 
                            button onClick={this.setSchedule.bind(this, item.groupid)}
                            >
                              <IonIcon
                              icon={calendarSharp}
                              size="large"
                              className="io-icon"
                              ></IonIcon>
                              <p style={{padding: "0.5em"}}>Set Schedule</p>
                            </IonItem>

                            <IonItem
                            button onClick={() =>this.setState({deleteAlert: true, toDeleteID: item._id})}
                            >
                            <IonIcon
                              icon={trash}
                              size="large"
                              className="io-icon"
                              ></IonIcon>
                              <p style={{padding: "0.5em"}}>Delete</p>
                            </IonItem>

                          </IonList>
                        </IonPopover>
                        <IonAlert
                        isOpen={this.state.deleteAlert}
                        onDidDismiss={() => this.setState({deleteAlert: false})}
                        header={'Alert'}
                        message={'Are you sure you want to delete this group?'}
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
                              console.log(this.state.toDeleteID)
                              this.deleteGroup()
                            }
                          }
                        ]}/>



                         <EditGroupModal
                          group={item}
                          isOpen={this.state.showEditGroupModal}
                          onDidDismiss={(popoverDismiss) => {this.setState(() =>({showEditGroupModal: false, isOpen: !popoverDismiss}))}}
                          slots={() =>{}}
                          /> 
                        </div>
    );
 }
}



export default withRouter(LongPressPopover);

                       
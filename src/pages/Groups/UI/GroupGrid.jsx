import React from "react";
import { 
    IonContent,
    IonCol,
    IonButton,
    IonIcon,
    IonLabel,
    IonRow,
    IonGrid,
    IonRefresher
   

 } from "@ionic/react";
import { withRouter } from "react-router";
import {retrieveGroups, retrieveSlots}  from "../../ServerRequests/globalApi";
import LoadingCards from "../../MiscUiComponents/LoadingCards";
import DisplayIconComponent from "../../MiscUiComponents/DisplayIconComponent";
import { chipState , getChipMac} from "../../ServerRequests/localApi";
import { Socket } from "net";


var longPressed = false;


class GroupGrid extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            groups: [],
            groupsLoaded: false,
            requestedStateMac: []
        }
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
    }

  
//Long Press----------------------------------------------------------------------------
     
      handleButtonPress (group) {
        console.log("Pressed:"+group._id);
        longPressed = false;
        this.buttonPressTimer = setTimeout(() => this.longPressed(group), 500);
      }
      shortPressed(group)
      {this.props.isShortPressed(group);}

      longPressed(group)
      {
        this.props.isLongPressed(group);
        longPressed = true;
      }

      handleButtonRelease (group) {
        if(!longPressed){ this.shortPressed(group)}
        clearTimeout(this.buttonPressTimer);
      }
//Long Press----------------------------------------------------------------------------

    
  async getGroups(){

    var homeid = JSON.parse(localStorage.getItem("homeid"));
    var data = JSON.stringify({homeid: homeid});
    var groups = JSON.parse(localStorage.getItem("groups"));
    switch(groups){
      case null:
          console.log("No groups found in local storage. Attempting to retrieve from cloud storage"); 
        break;
      

      case 0:
          console.log("No groups found in local storage. Attempting to retrieve from cloud storage"); 
        break;

      default:
      this.setState({groupsLoaded: true, groups: groups});
      for(var i=0; i<groups.length; i++)
        {this.setGroupState(groups[i]._id);}
      this.props.groups(groups);
      console.log("Groups loaded from local storage"); 
      break;

    }
   
    
    const response = await retrieveGroups(data);
    if(response !== undefined){
      console.log(response[0]);
      switch(response[0].status){

        case 200:
        this.setState({groupsLoaded: true, groups: response[0].data.groups});
        //Save in local storage
        localStorage.setItem("groups", JSON.stringify(response[0].data.groups) );
        for(var i=0; i<response[0].data.groups.length; i++)
        {this.setGroupState(response[0].data.groups[i]._id);}
        this.props.groups(response[0].data.groups);
        break;


          default:
              this.setState({showToast: true,
              toastMsg: "Server Error."});
              this.props.groups([]);
            break;

      }

      
      }else{
        this.setState({groupsLoaded: true,
          showToast: true,
          toastMsg: "Server Error."});
          this.props.groups([]);
          console.log("Could not retrieve groups. Null response"); 
        }

      }


    


  




  async setGroupState(groupid){

    this.setState({groupsLoaded: true});
    this.props.isRetrievingState(true);
    
    var groups = JSON.parse(localStorage.getItem("groups"));
    var group = [];
    for(var j=0;j<groups.length; j++){
      if(groups[j]._id === groupid)
      {group = groups[j];}
    }
    var groupSlotCount = group.slots.length;
    
    var groupStateInt = 0;

    var macIds = [];
            console.log(groups);
            for(var i=0; i< groups.length; i++){
              for(var j=0; j<groups[i].slots.length; j++){
                var contains = false;
                for(var k=0; k<macIds.length; k++)
                { if(macIds[k]===groups[i].slots[j].mac){contains=true; break;} }
                if(!contains){macIds[i] = groups[i].slots[j].mac; }
              }
            }

            
    
    
     for(var j=0; j<macIds.length; j++){
      var ip = JSON.parse(localStorage.getItem(macIds[j])).ip;
      console.log(ip);
      await this.getStateLocally(ip, macIds[j]);
     }

      for(var i=0; i< groupSlotCount; i++){
        
        if(await this.getSlotState(group.slots[i].slotnumber, group.slots[i].mac) === 0)
        {groupStateInt++;}
      }
    
    

    switch(groupStateInt){
      case 0:
        groupStateInt = 0;
        break;

      case groupSlotCount:
        groupStateInt = 2;
        break;

        default:
          groupStateInt = 1;
          break;
    }

    var groups = this.state.groups;
    for(var j=0; j<groups.length; j++)
    {if(groups[j]._id === groupid){ groups[j].state = groupStateInt; }}

    this.setState({groups: groups});
    this.props.isRetrievingState(false);
    // console.log(this.state.groups);
   

    


  }


  async getSlotState(slotnumber, mac){

   
    //var ip = JSON.parse(localStorage.getItem(mac)).ip;
    //await this.getStateLocally(ip, mac);
 
    

    var stateInt = parseInt(JSON.parse(localStorage.getItem(mac)).state);
    var slotcount = parseInt(JSON.parse(localStorage.getItem(mac)).slotcount);
    var stateBin = stateInt.toString(2);
    var arr = stateBin.split("").map(Number);


    
      var stateBinArr = [];
      var difference = parseInt(slotcount) - parseInt(arr.length);

      for(var i = 0; i < difference; i++){stateBinArr[i] = 0;}
      for(var j = 0; j < arr.length; j++){stateBinArr[j+difference] = arr[j]; }

      return stateBinArr[slotnumber-1];
    


  }
 

async getStateLocally(ip, mac){

        
// const isIPCorrect = await this.verifyMac(mac);
// if(isIPCorrect){

    const response = await chipState(ip);

      
    if(response !== undefined){

      switch(response[0].status){

          case 200:
            var chip = JSON.parse(localStorage.getItem(mac));
            chip.state = response[0].data.state;
            localStorage.setItem(mac, JSON.stringify(chip));
            break;

            default:
              console.log("Could not get chip state. MAC: "+mac);
              // await this.getStateFromCloud(mac);
              break;

      }
    }else{             
          console.log("Could not get chip state. MAC: "+mac);
          // await this.getStateFromCloud(mac);
         }



  // }

}


// async getStateFromCloud(mac){
//   var reqMac = this.state.requestedStateMac;
//   console.log(reqMac);
  

//    window.socket.emit("broadcast-state", { mac: mac});
//    reqMac.push(mac);
//    console.log("Requested broadcast-state");
//    this.setState({requestedStateMac: reqMac});

// }



  // async verifyMac(mac){

  //   var IP = JSON.parse(localStorage.getItem(mac)).ip;
    
  //     const response = await getChipMac(IP);

  //     if(response !== undefined){

  //       switch(response[0].status){
          
  //         case 200:
  //           if(response[0].data.mac === mac)
  //           {return true;}
  //           else
  //           {
  //             console.log("Incorrect local IP.");
  //             return this.getIPfromCloud(mac)?true:false; 
  //           }
            

  //         case 404:
  //           console.log("Could not verify local IP. Error:"+response[0].data);
  //           return false;
          
  //         default :
  //           console.log("Could not verify local IP. Error:"+response[0].data);
  //           return false;

  //       }
  
   
  //       }else{return false;}

  // }

  // async getIPfromCloud(mac){
    
  //   var data = JSON.stringify({mac: mac});
  //   console.log("Attempting to get new ip of "+mac);

    

  //   const response = await retrieveSlots(data);

  //   if(response !== undefined){
  //     console.log(response[0]);
  //     switch(response[0].status){

  //       case 200:
  //           var existing = JSON.parse(localStorage.getItem(mac));
  //           existing.ip = response[0].data.ip;
  //           localStorage.setItem(mac, JSON.stringify(existing));
  //           console.log("Attempt to retrieve ip from cloud sucessful.");
  //           return true;
          

  //         default:
  //           console.log("Could not retrieve chip ip from cloud.");
  //           return false;
  //         }
  //       }else{console.log("Could not retrieve chip ip from cloud."); return false;      }
        
    
  // }
    


render(){
let body;
let groupGrid = [];
let load = this.props.reload;
let groupState = this.props.shouldSetState;



    if(load){
      console.log("Retrieving Groups...")
      this.getGroups();
      body=(<LoadingCards/>);
    }else{

            if(this.state.groups.length > 0){
            groupGrid = (
                this.state.groups.map((item) =>{
                  switch(item.state){
                    case 0:
                      return(
                      
                        <IonCol className="group-grid-col"  size="6"  color="dark">
                        <IonButton
                          style={{height: "100%"}}
                          className="group-btn-off"
                          size="large"
                          expand="block"
                          color="light-tint"
                          onTouchStart={this.handleButtonPress.bind(this, item)}
                          onTouchEnd={this.handleButtonRelease.bind(this, item)} 
                          >
                          <DisplayIconComponent
                            icon={item.icon}
                            size="large"
                            className="io-icon"
                            fill="clear"
                          />

                          </IonButton>
                          <br />
                          <IonLabel class="ion-text-center">{item.name}</IonLabel>
                        
                        </IonCol>

                    )

                    case 1:
                      return(
                      
                        <IonCol className="group-grid-col"  size="6" color="dark" >
                        <IonButton
                          style={{height: "100%"}}
                          className="group-btn-some-on"
                          size="large"
                          expand="block"
                          color="light-tint"
                          onTouchStart={this.handleButtonPress.bind(this, item)}
                          onTouchEnd={this.handleButtonRelease.bind(this, item)} 
                          >
                          <DisplayIconComponent
                            icon={item.icon}
                            size="large"
                            className="io-icon"
                            fill="clear"
                          />

                          </IonButton>
                          <br />
                          <IonLabel class="ion-text-center">{item.name}</IonLabel>
                        
                        </IonCol>

                        ) 


                        default:
                          return(
                      
                            <IonCol className="group-grid-col"  size="6">
                            <IonButton
                              style={{height: "100%"}}
                              className="group-btn-all-on"
                              size="large"
                              expand="block"
                              color="light-tint"
                              onTouchStart={this.handleButtonPress.bind(this, item)}
                              onTouchEnd={this.handleButtonRelease.bind(this, item)} 
                              >
                              <DisplayIconComponent
                                icon={item.icon}
                                size="large"
                                className="io-icon"
                                fill="clear"
                              />
                              </IonButton>
                              <br />
                              <IonLabel class="ion-text-center">{item.name}</IonLabel>
                            
                            </IonCol>
        
                        )
                }

              })
            
            );
        }

            body =(
              
                  <IonGrid style = {{margin: "1rem", height: "100%"}}>
                  <IonRow>
                  {groupGrid}
                  </IonRow>
                
                  </IonGrid>
                    
                );
            }

            if(groupState!==false){
              console.log("Setting up group state..."+groupState);
              let groups = this.state.groups;
              var changedGroup = [];

               
                for(var i=0;i<groups.length;i++){

                    
                        for(var j=0;j<groups[i].slots.length; j++){
                            if(groups[i].slots[j].mac===groupState.mac)
                            { 
                              if(!changedGroup.includes(groups[i]._id))
                                {changedGroup.push(groups[i]._id);}
                            }
                         }
                      
                  }
              
              
            

              for(var k=0;k<changedGroup.length;k++)
              { 
                console.log(changedGroup);
                this.setGroupState(changedGroup[k]);
              }
                this.props.didSetState();
          }

        

    return(body);
      
    
}

}
export default withRouter(GroupGrid);



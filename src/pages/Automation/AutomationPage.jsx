import {
   
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
    IonButton,
    IonLabel,
    IonCol,
    IonCard,
    IonCardContent,
    IonGrid,
    IonCardHeader,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonItemDivider,
    IonContent,
    IonAlert,
    IonPopover,
    IonList,
    IonToast,
    IonLoading,
    IonItem,
    IonDatetime,
    IonImg

 } from "@ionic/react";

import { trash, timerOutline, personCircleSharp } from "ionicons/icons";
import React, { useState } from "react";
import LoadingCards from "../MiscUiComponents/LoadingCards";
import RepeatSelector from "./RepeatSelector";
import RepeatDisplay from "./RepeatDisplay";

import "./AutomationPage.css"
import TimeInput from 'material-ui-time-picker'
import { retrieveSlots } from "../ServerRequests/globalApi";
import { getTimers, getSchedules, getChipMac, setTimer, setSchedule, deleteTimer, deleteSchedule } from "../ServerRequests/localApi";
import notFound from "../../images/device-icons/notFound/notFound.svg";
import DisplayIconComponent from "../MiscUiComponents/DisplayIconComponent";
import { Network } from '@capacitor/network';
import io from "socket.io-client";
import WebSocket from "ws";
const socket = io();




var auth_token;
var IP = "";
var toastMsg = "";
var localSockets;
var localSocketKeys;
var setOnTim;
var setOffTim;
var timerDur;
var repeat = [true,true,true,true,true,true,true];


class AutomationPage extends React.Component {
    constructor(props) {
        super(props);
        auth_token = JSON.parse(localStorage.getItem("token"));

        
        
        this.state = {
          loadingTimers: true,
          loadingSchedules: true,
          chips: [],
          timerData: [],
          schedulerData: [],
          showTimDelAlert:false,
          showSchDelAlert: false,
          showTimSetAlert: this.props.properties !== undefined?this.props.properties.showTimSetAlert:undefined,
          timSetAlertName: this.props.properties !== undefined?this.props.properties.name:"Set Timer",
          showSchSetAlert: this.props.properties !== undefined?this.props.properties.showSchSetAlert:undefined,
          schSetAlertName: this.props.properties !== undefined?this.props.properties.name:"Set Schedule",
          setMac: this.props.properties !== undefined?this.props.properties.setMac:"",
          deleteMac: "",
          deleteSlot: "",
          slotsItems: [],
          IP,
          displayPage: this.props.properties !== undefined?this.props.properties.displayPage:"timers",
          repeat: repeat,
          settingUp: "NULL",
          networkType: undefined,
          networkConnected: undefined

        };

        //this.repeatSelector.bind(this);

        
      }


      async componentDidMount() {
        // this.setState({loadingTimers: true, loadingSchedules: true});
        this.networkStatusSetup();
        // this.getLocalStorageData();
        this.getSchedulesLocally();
        this.getTimersLocally();
        // this.websocketfn();
      }


      async networkStatusSetup(){
        
        Network.addListener('networkStatusChange', status => {
          this.setState({networkConnected: status.connected, 
                         networkType: status.connectionType });
          console.log('Network status changed '+status.connectionType);
        });
        
        const logCurrentNetworkStatus =  await Network.getStatus();
        if(logCurrentNetworkStatus !==undefined)
        { this.setState({networkConnected: logCurrentNetworkStatus.connected, 
          networkType: logCurrentNetworkStatus.connectionType });
          console.log('Network status: '+logCurrentNetworkStatus.connectionType);
        }
          
      
      }




      // websocketfn() {


      //   var homeid = JSON.parse(localStorage.getItem("homeid"));
      //   var roomIDS = JSON.parse(localStorage.getItem(homeid));
      //   var rooms = [];
      //   for(var z=0; z<roomIDS.length; z++)
      //   { 
      //     if(roomIDS[z] !== null){
      //       console.log(roomIDS[z]._id);
      //     var room = JSON.parse(localStorage.getItem(roomIDS[z]._id));
      //     if(room !== undefined){rooms.push(room);} 
          
      //     }
      //   } 
      //   console.log(rooms);

      //   for(var a=0; a<rooms.length; a++){
      //       var chips = rooms[a];

      //       if(chips !== null){
      //         for(var b=0;b<chips.length;b++){
      //           var IP = chips[b].ip;
      //           localSocketKeys[b] = IP; 
      //           localSockets[b] = new WebSocket("ws://"+IP+":81/");
      //           console.log("Local IP:" + IP);
            
      //           var ctx = this;
            
      //           localSocket.onmessage = function (evt) {
      //             try{
      //               console.log(evt.data);

      //               var resp = JSON.parse(evt.data);


      //               if (resp) {
      //                 var type = resp.type;
      //                 if((type === "timer")){

      //                   for(var i=0; i< resp.timers.length; i++){
      //                     var measuredTime = new Date(null);
      //                     measuredTime.setSeconds(resp.timers[i]); // specify value of SECONDS
      //                     var time = measuredTime.toISOString().substr(11, 8);
      //                     if(resp.timers[i] !== 0){

      //                       let td = ctx.state.timerData;
      //                       for(var j=0; j< td.length; j++){
      //                         if((i+1) === td[j].slot){
      //                           td[j] = {
      //                             "mac": resp.mac,
      //                             "slot": (i+1),
      //                             "timer": time,
      //                             "icon": td[j].icon,
      //                             "name": td[j].name,
      //                             "color": "primary" 
      //                           };
      //                         }
      //                       }
                            
      //                       ctx.setState({timerData: td });

      //                     }
      //                   }
      //                   //console.log(ctx.state.timerData);

      //                 }


      //               }else {
      //                 toastMsg = "Could not load timers";
      //                 this.handleToast();
      //               }
      //             }
      //             catch(err){ console.log("Could not load timer (Parse err)"+err);}
                
      //           };
      //           localSocket.onopen = function (evt) {
      //             console.log("Local WS Open");
      //           };
            
      //           localSocket.onclose = function (evt) {
      //             console.log("Local WS Closed");
      //             try{ localSocket = new WebSocket("ws://"+IP+":81/");}
      //             catch(error){console.log(error);}
      //           };


      //         }
      //       }
      //     }
      // }
    
    
      showAlertFn(mac, slot, type){
        this.setState({deleteMac: mac});
        this.setState({deleteSlot: slot});
        if(type === "timer"){this.setState({showTimDelAlert: true, showTimSetAlert: undefined});}
        if(type === "schedule"){this.setState({showSchDelAlert: true, showSchSetAlert: undefined});}  
      }

  async deleteTimer(){
        this.setState({showTimDelAlert: false, loadingTimers: true});
        console.log('Mac:'+this.state.deleteMac+' Slot:'+this.state.deleteSlot);
        socket.emit("timer-delete", {mac: this.state.deleteMac, slotnumber: this.state.deleteSlot});
        if(this.verifyMac(this.state.deleteMac)){

          var ip = JSON.parse(localStorage.getItem(this.state.deleteMac)).ip;
          const response = await deleteTimer(ip, this.state.deleteSlot);
          
          
          if(response !== undefined){

            switch(response[0].status){

              case 200:
                toastMsg = "Timer has been deleted."
                this.handleToast();
                var timerData = this.state.timerData;

                  for(var x=0; x<timerData.length; x++){
                            
                    if(timerData[x].mac === this.state.deleteMac &&
                       timerData[x].slot === this.state.deleteSlot)
                       {timerData.splice(x,1);}
                  }

                this.setState({timerData: timerData, loadingTimers: false});
                
                break;
  
              default:
                toastMsg = "Timer couldn't be deleted."
                this.handleToast();
                break;

            }



          }else{
            toastMsg = "Timer couldn't be deleted."
            this.handleToast();
          }


        }else{
          toastMsg = "Timer couldn't be deleted."
          this.handleToast();
        }

  }



  async deleteSchedule(){

        this.setState({showSchDelAlert: false, loadingSchedules: true});
        console.log('Mac:'+this.state.deleteMac+' Slot:'+this.state.deleteSlot);
        socket.emit("schedule-delete", {mac: this.state.deleteMac, slotnumber:this.state.deleteSlot, schedule: this.state.schedulerData});
        console.log('Mac:'+this.state.deleteMac+' Slot:'+this.state.deleteSlot);
        
        if(this.verifyMac(this.state.deleteMac)){

          var ip = JSON.parse(localStorage.getItem(this.state.deleteMac)).ip;
          const response = await deleteSchedule(ip, this.state.deleteSlot);
          
          
          if(response !== undefined){

            switch(response[0].status){

              case 200:
                toastMsg = "Schedule has been deleted."
                this.handleToast();
                var schedulerData = this.state.schedulerData;

                for(var x=0; x<schedulerData.length; x++){
                          
                  if(schedulerData[x].mac === this.state.deleteMac &&
                     schedulerData[x].slotnumber === this.state.deleteSlot)
                     { console.log("Removing schedule: "+schedulerData[x]);
                       schedulerData.splice(x,1);}
                }

                this.setState({schedulerData: schedulerData, loadingSchedules: false});
                
                break;
  
              default:
                toastMsg = "Schedule couldn't be deleted."
                this.handleToast();
                break;

              }



          }else{
            toastMsg = "Schedule couldn't be deleted."
            this.handleToast();
          }


        }else{
          toastMsg = "Schedule couldn't be deleted."
          this.handleToast();
        }
      }




      async verifyMac(mac){

       
        var IP = JSON.parse(localStorage.getItem(mac)).ip;
        
          const response = await getChipMac(IP);
    
          if(response !== undefined){
            console.log(response[0]);
    
            switch(response[0].status){
              
              case 200:
                if(response[0].data.mac === mac)
                {return true;}
                else
                {
                  console.log("Incorrect local IP.");
                  this.getIPfromCloud(mac);
                  return false;
                }
                
    
              case 404:
                console.log("Could not verify local IP. Error:"+response[0].data);
                return false;
              
              default :
                console.log("Could not verify local IP. Error:"+response[0].data);
                return false;
    
            }
      
       
            }else{return false;}
    
      }
    

      
  async getIPfromCloud(mac){
      
    var data = JSON.stringify({mac: mac});
    console.log("Attempting to get new ip of "+mac);

    

    const response = await retrieveSlots(data);

    if(response !== undefined){
      console.log(response[0]);
      switch(response[0].status){

        case 200:
            var existing = JSON.parse(localStorage.getItem(mac));
            existing.ip = response[0].data.ip;
            localStorage.setItem(mac, existing);
            console.log("Attempt to retrieve ip from cloud sucessful.");
          break;

          default:
            console.log("Could not retrieve chip ip from cloud.");
            break;
          }
        }else{console.log("Could not retrieve chip ip from cloud.");}
        
    
  }





      async getSchedulesLocally(){

        this.setState({loadingSchedules: true});

        //Get all room data from local storage
        var homeid = JSON.parse(localStorage.getItem("homeid"));
        var roomIDS = JSON.parse(localStorage.getItem(homeid)).rooms;
        var rooms = [];
        for(var z=0; z<roomIDS.length; z++)
        { 
          if(roomIDS[z] !== null){
            console.log(roomIDS[z]._id);
            var room = JSON.parse(localStorage.getItem(roomIDS[z]._id));
            if(room !== undefined){rooms.push(room);} 
          }
        } 
        console.log(rooms);

        for(var a=0; a<rooms.length; a++){
            var chips = rooms[a];

            if(chips !== null){
              for(var b=0;b<chips.length;b++){
                var ip = chips[b].ip;
  
  
    if(ip !== undefined || this.state.networkType !== "wifi"){
  
          const response = await getSchedules(ip);
  
              if(response !== undefined){
  
                      switch(response[0].status){
                        case 200:
                          var schedulerData = this.state.schedulerData;

                          console.log("Scheduler: "+response[0].data.schedules);

                          for(var i=0; i< response[0].data.schedules.length; i++){
  
  
                            //On Time
                            var sTime = parseInt(response[0].data.schedules[i].substring(0, 4));
                            var repeatDec = response[0].data.schedules[i].substring(4, 7);
                            var duration = parseInt(response[0].data.schedules[i].substring(7, 12));
                            var nextDay = false; 


      
                          //On Time
                
                            var on_hours=0;
                            var on_minutes=0;
                            for(var y=0;y<sTime;y++)
                            {
                              on_minutes += 1;
                              if(on_minutes >= 60){
                                on_minutes = 0;
                                on_hours +=1;
                              }
                            }
      
                            var on_am_pm = on_hours >= 12 ? "PM" : "AM";
                            on_hours = on_hours > 12 ? on_hours - 12 : on_hours;
                            on_hours = on_hours === 0 ? 12 : on_hours;
                            on_hours = on_hours < 10 ? "0" + on_hours : on_hours;
                            on_minutes = on_minutes < 10 ? "0" + on_minutes : on_minutes;
                            var on_time = on_hours + ":" + on_minutes + " " + on_am_pm;
      
                            
                          //Repeat
                          var repeatStr = parseInt(repeatDec).toString(2);
                          var repeatBin = repeatStr.split("");
                          console.log(repeatBin);
                          var difference = 8 - parseInt(repeatBin.length);
                          
      
                          
                          var repeat = [];
                          repeatStr = "";
                          for(var k = 0; k < difference; k++){repeatStr += "0";}
                          for(var j = 0; j < repeatBin.length; j++){repeatStr  += repeatBin[j]; }
                          console.log(repeatStr);
                          repeatBin = repeatStr.split("");
                          for(var l = 0; l < 7; l++)
                          {if(repeatBin[l] === "1"){repeat[l] = true;}else{repeat[l] = false;}}
                          
      
      
                          //Off time
                          
                          var offMins = (parseInt(sTime) + parseInt(duration));
                          
      
                            if(offMins >= 1440){
                              console.log("Duration"+(sTime + duration) );
                              nextDay = true;
                              offMins = ((parseInt(sTime) + parseInt(duration))) - 1440;
                            }
      
                          var off_minutes = 0;
                          var off_hours = 0;
                          for(var x=0;x<offMins;x++)
                          {
                            off_minutes += 1;
                            if(off_minutes >= 60){
                              off_minutes = 0;
                              off_hours +=1;
                            }
                          }
      
      
                            var off_am_pm = off_hours >= 12 ? "PM" : "AM";
                            off_hours = off_hours > 12 ? off_hours - 12 : off_hours;
                            off_hours = off_hours === 0 ? 12 : off_hours;
                            off_hours = off_hours < 10 ? "0" + off_hours : off_hours;
                            off_minutes = off_minutes < 10 ? "0" + off_minutes : off_minutes;
      
                            var off_time = off_hours + ":" + off_minutes + " " + off_am_pm;
      
                            
      
      
                            if(response[0].data.schedules[i] !== "0"){
                              console.log("sTime"+sTime);
                              

                              var slotData = this.getSlotsLocally(response[0].data.mac);
                              console.log(slotData);
                              var icon = {iconname: "LIGHTS", int: 1};
                              var slotname = "Device";
                              
                              for(var f=0; f<slotData.length; f++){
                                if((i+1) === slotData[f].slotnumber)
                                {
                                  icon = slotData[f].sloticon;
                                  slotname = slotData[f].slotname;
                                }
                              }
      

                              var contains = false;
                              var s_data ={
                                "mac": response[0].data.mac,
                                "slotname": slotname,
                                "slotnumber": i+1,
                                "icon": icon,
                                "on": on_time,
                                "repeat": repeat,
                                "off": off_time,
                                "nextDay": nextDay
      
                              }
    
                              for(var x=0; x<schedulerData.length; x++){
                                
                                if(schedulerData[x].mac === s_data.mac &&
                                  schedulerData[x].slotnumber === s_data.slotnumber)
                                    {
                                     schedulerData[x] = s_data;
                                     contains = true;
                                    }
                              }
    
    
                              if(!contains){schedulerData.push(s_data);}
                              console.log(s_data);
                              console.log(schedulerData);
                              
                            }
                          }
                          
                          this.setState({loadingSchedules: false , schedulerData: schedulerData});
                          console.log(schedulerData);
                          //localStorage.setItem("timers", JSON.stringify(resp.timers)); 
                        
                          break;
  
                          default:
                            this.setState({loadingSchedules: false});

                            toastMsg = "Could not load schedules for "+rooms[a].name;
                            this.handleToast();
                            break;
                      }
  
                    }else{
                      this.setState({loadingSchedules: false});
                      console.log("Could not load schedules for "+rooms[a].name);
                    }
  
  
                  }else{this.getSchedulesFromCloud();}
            }


              }

            }
            
            this.setState({loadingSchedules: false});

      


      }


      getLocalStorageData(){
          var homeid = JSON.parse(localStorage.getItem("homeid"));
          var roomIDS = JSON.parse(localStorage.getItem(homeid)).rooms;
          var rooms = [];
          var timers = [];
          var schedules = [];
          for(var z=0; z<roomIDS.length; z++)
          { 
            if(roomIDS[z] !== null){
            var room = JSON.parse(localStorage.getItem(roomIDS[z]._id));
            if(room !== undefined){rooms.push(room);} 
            }

          } 
         

          for(var a=0; a<rooms.length; a++){
              var chips = rooms[a];
              
              if(chips != null){
                this.setState({chips: chips});
                for(var b=0;b<chips.length;b++){


                  for(var c=0;c<chips[b].slots.length;c++){
                    var slot = chips[b].slots[c];
                    
                    
                    

                        if(slot.timerduration !== undefined && slot.timerduration > 0){
                          var measuredTime = new Date(null);
                          measuredTime.setSeconds(slot.timerduration); // specify value of SECONDS
                          var time = measuredTime.toISOString().substr(11, 8);
                            timers.push({
                              "mac": chips[b].mac,
                              "name": slot.slotname,
                              "icon": slot.sloticon,
                              "slot": slot.slotnumber,
                              "timer": time
                          });
                        }



                        if(slot.schedule !== undefined && slot.schedule !== "0"){
                         
                          //On Time
                          var sTime = parseInt(slot.schedule.substring(0, 4));
                          var repeatDec = slot.schedule.substring(4, 5).charCodeAt();
                          var duration = parseInt(slot.schedule.substring(5, 9));
                          var nextDay = false; 


    
                        //On Time
                          var on_hours=0;
                          var on_minutes=0;
                          for(var y=0;y<sTime;y++)
                          {
                            on_minutes += 1;
                            if(on_minutes >= 60){
                              on_minutes = 0;
                              on_hours +=1;
                            }
                          }
    
                          var on_am_pm = on_hours >= 12 ? "PM" : "AM";
                          on_hours = on_hours > 12 ? on_hours - 12 : on_hours;
                          on_hours = on_hours === 0 ? 12 : on_hours;
                          on_hours = on_hours < 10 ? "0" + on_hours : on_hours;
                          on_minutes = on_minutes < 10 ? "0" + on_minutes : on_minutes;
                          var on_time = on_hours + ":" + on_minutes + " " + on_am_pm;
    
                          
                        //Repeat
                        var repeatStr = parseInt(repeatDec).toString(2);
                        var repeatBin = repeatStr.split("");
                        var difference = 8 - parseInt(repeatBin.length);
    
    
                        
                        var repeat = [];
    
                        for(var k = 0; k < difference; k++){repeatStr += "0";}
                        for(var j = 0; j < repeatBin.length; j++){repeatStr  += repeatBin[j]; }
                        for(var l = 0; l < 7; l++)
                        {if(repeatBin[l] === "1"){repeat[l] = true;}else{repeat[l] = false;}}
    
    
    
                        //Off time
                        
                        var offMins = (parseInt(sTime) + parseInt(duration));
                        
    
                          if(offMins >= 1440){
                            console.log("Duration"+(sTime + duration) );
                            nextDay = true;
                            offMins = ((parseInt(sTime) + parseInt(duration))) - 1440;
                          }
    
                        var off_minutes = 0;
                        var off_hours = 0;
                        for(var x=0;x<offMins;x++)
                        {
                          off_minutes += 1;
                          if(off_minutes >= 60){
                            off_minutes = 0;
                            off_hours +=1;
                          }
                        }
    
    
                          var off_am_pm = off_hours >= 12 ? "PM" : "AM";
                          off_hours = off_hours > 12 ? off_hours - 12 : off_hours;
                          off_hours = off_hours === 0 ? 12 : off_hours;
                          off_hours = off_hours < 10 ? "0" + off_hours : off_hours;
                          off_minutes = off_minutes < 10 ? "0" + off_minutes : off_minutes;
    
                          var off_time = off_hours + ":" + off_minutes + " " + off_am_pm;



                          schedules.push({
                            "mac": chips[b].mac,
                            "slotname": slot.slotname,
                            "slotnumber": slot.slotnumber,
                            "icon": slot.sloticon,
                            "on": on_time,
                            "repeat": repeat,
                            "off": off_time,
                            "nextDay": nextDay
  
                          });

                        }

                       


                      
                    }


                    
                 
                    
                  
                  // if(timers.length !== 0)
                  // {this.setState({});}
                  // else{this.getTimersFromCloud();}

                  // if(schedules.length !== 0)
                  // {this.setState({});}
                  // else{this.getSchedulesFromCloud();}
                }
              }
          }

          var tData = this.state.timerData;
          var sData = this.state.schedulerData;

          

          if(timers !== undefined){
          for(var e=0; e<timers.length; e++){tData.push(timers[e]);}
          this.setState({timerData: timers, loadingTimers: false});
          }

          if(schedules !== undefined){
          for(var f=0; f<schedules.length; f++){sData.push(schedules[f]);}
          this.setState({schedulerData: sData, loadingSchedules: false});
          }



      }




       getTimersFromCloud(){
        return 0;
      }






       getSchedulesFromCloud(){return 0;}




     async getTimersLocally(){
      this.setState({loadingTimers: true});
      
      
      var homeid = JSON.parse(localStorage.getItem("homeid"));
      var roomIDS = JSON.parse(localStorage.getItem(homeid)).rooms;
      var rooms = [];
      console.log(roomIDS);
      for(var z=0; z<roomIDS.length; z++)
      { 
        if(roomIDS[z] !== null){
        var room = JSON.parse(localStorage.getItem(roomIDS[z]._id));
        if(room !== undefined){rooms.push(room);} 
        }
      } 

      for(var a=0; a<rooms.length; a++){
        var chips = rooms[a];

        if(chips !== null){
          for(var b=0;b<chips.length;b++){
            var ip = chips[b].ip;

    //-----------------------------------------------------------
    if(ip !== undefined || this.state.networkType !== "wifi" ){
                console.log(ip);
      const response = await getTimers(ip);

      if(response !== undefined){

              switch(response[0].status){
                case 200:
                      var timerData = this.state.timerData;
                      for(var i=0; i< response[0].data.timers.length; i++){
                        var measuredTime = new Date(null);
                        measuredTime.setSeconds(response[0].data.timers[i]); // specify value of SECONDS
                        var time = measuredTime.toISOString().substr(11, 8);
                       
                        if(response[0].data.timers[i] !== 0){

                          var slotData = this.getSlotsLocally(response[0].data.mac);
                          var icon = {iconname: "LIGHTS", int: 1};
                          var slotname = "Device";
                          
                          for(var f=0; f<slotData.length; f++){
                            if((i+1) === slotData[f].slotnumber)
                            {
                              icon = slotData[f].sloticon;
                              slotname = slotData[f].slotname;
                            }
                          }
                          var contains = false;
                          var t_data ={
                            "mac": response[0].data.mac,
                            "name": slotname,
                            "icon": icon,
                            "slot": (i+1),
                            "timer": time
                          } 

                          for(var x=0; x<timerData.length; x++){
                            
                            if(timerData[x].mac === t_data.mac &&
                               timerData[x].slot === t_data.slot &&
                               timerData[x].time === t_data.time){
                                 timerData[x] = t_data;
                                 contains = true;
                                }
                          }


                          if(!contains){timerData.push(t_data);}
                          console.log(t_data);
                          console.log(timerData);
                         
                        }
                      }
                      
                      this.setState({loadingTimers: false, timerData: timerData});
                      //localStorage.setItem("timers", JSON.stringify(resp.timers)); 
                      console.log(response[0].data);
                      
                
                  break;

                  default:
                    this.setState({loadingTimers: false});
                    toastMsg = "Could not load timers stored in "+rooms[a].name;
                    this.handleToast();
                    break;
              }

      }else{ 
        this.setState({loadingTimers: false});
        console.log("Could not load timer for chip "+rooms[a].name); 
      }


   }else{this.getTimersFromCloud();}
  }
}
      }
    }






     timerOnClick(){this.setState({displayPage: "timers"})}
     schedulerOnClick(){this.setState({displayPage: "schedules"})}

     onCardClick(item, slot, type){
       if(type === "scheduler")
       {
         console.log(item);
         var arr = [];
         if(this.state.showSchSetAlert !== undefined)
         {arr = this.state.showSchSetAlert;}
         arr.push(item); 
         this.setState({showSchSetAlert: arr});
        }

       if(type === "timer")
       {
         var arr = [];
         if(this.state.showTimSetAlert !== undefined)
         {arr = this.state.showTimSetAlert;} 
         arr.push(item);
         console.log(item);
         this.setState({showTimSetAlert: arr})
        }

     }

     async setTimer(){
       this.setState({settingUp: "Setting up Timer(s)..."});

      console.log("TimerSet:"+timerDur);
      console.log("showTimSetAlert:"+JSON.stringify(this.state.showTimSetAlert));
      var hours = parseFloat(timerDur?.split(":")[0]);
      var mins = parseFloat(timerDur?.split(":")[1]);
      var secs = parseFloat(timerDur?.split(":")[2]);
      hours = hours * 60;
      secs = secs/60;
      var timer_dur = parseFloat(hours+mins+secs).toFixed(3);
      console.log("TimerSet:"+timer_dur);

      var loaded = 1;


        for(var i=0; i<this.state.showTimSetAlert.length; i++){
          this.setState({settingUp: "Setting up Timer "+(i+1)+" of "+(this.state.showTimSetAlert.length)});

        var slot = this.state.showTimSetAlert[i].slotnumber !== undefined?this.state.showTimSetAlert[i].slotnumber:this.state.showTimSetAlert[i].slot;
        console.log("showTimSetAlert slotnumber:"+slot);


        var mac = this.state.showTimSetAlert[i].mac;
        var ip = JSON.parse(localStorage.getItem(mac)).ip;

    
        

        const response = await setTimer(ip, timer_dur, slot,mac);

        if(response !== undefined){
          this.setState({settingUp: "NULL"});

            switch(response[0].status){
              case 200 || 302:
                loaded +=1;
                if(loaded>this.state.showTimSetAlert.length)
                {this.setState({settingUp: "NULL"});}
                else
                {this.setState({settingUp: "Setting up timer "+(loaded)+" of "+(this.state.showTimSetAlert.length)});}
                if(this.state.showTimSetAlert[i].name !==undefined)
                {toastMsg = "Timer has been set for device "+this.state.showTimSetAlert[i].name}
                else{toastMsg = "Timer has been set for device "+(i+1);}
                this.handleToast();
                this.getTimersLocally();
                break;

                default:
                  loaded +=1;
                  if(loaded>this.state.showTimSetAlert.length)
                  {this.setState({settingUp: "NULL"});}
                  else
                  {this.setState({settingUp: "Setting up timer "+(loaded)+" of "+(this.state.showTimSetAlert.length)});}
                  toastMsg = "Couldn't set timer.";
                  this.handleToast();

                  break;
            }


        }else{
          loaded +=1;
          if(loaded>this.state.showTimSetAlert.length)
          {this.setState({settingUp: "NULL"});}
          else
          {this.setState({settingUp: "Setting up timer "+(loaded)+" of "+(this.state.showTimSetAlert.length)});}
          toastMsg = "Couldn't set timer."
          this.handleToast();


        }

        
          
          
    
        }

        this.setState({ displayPage: "timers", showTimSetAlert: undefined});

        
}


async setSchedule(){
      this.setState({settingUp: "Setting Up Schedules(s)..."});
      console.log('Mac:'+this.state.setMac+' Slot:'+this.state.showSchSetAlert);



      var onMins = (setOnTim.getHours()*60) + setOnTim.getMinutes();
      var offMins = (setOffTim.getHours()*60) + setOffTim.getMinutes();

      if(offMins !== onMins){
        var duration;
        if(offMins > onMins){duration = offMins - onMins;}
        else{duration = 1440 + (offMins - onMins);}
      

      if(onMins < 1000){
        if(onMins < 100){
          if(onMins < 10)
          {onMins = "000" + onMins;}
          else{onMins = "00" + onMins;}
        }else{onMins = "0" + onMins;}
      }else{onMins = ""+onMins;}

      if(duration < 1000){
        if(duration < 100){
          if(duration < 10)
          {duration = "000" + duration;}
          else{duration = "00" + duration;}
        }else{duration = "0" + duration;}
      }else{duration = ""+duration;}
     


     
     

     var repeatBin = "";

     for(var y=0; y<8; y++){
       if(y!==7){if(this.state.repeat[y]){repeatBin += "1";}else{repeatBin += "0";}}
       else{repeatBin += "0";}
    }

   

    var repeatDec = parseInt(repeatBin, 2);
    var digitLength = repeatDec.toString().length;
    switch(digitLength){
      case 1:
        repeatDec = "00"+repeatDec.toString();
        break;
      
      case 2:
        repeatDec = "0"+repeatDec.toString();
        break;

      default:
        repeatDec = repeatDec.toString();
        break;
    }
    var schedule = onMins+repeatDec+duration;
    console.log('schedule:'+schedule);

    var loaded = 1;

    for(var i=0; i<this.state.showSchSetAlert.length; i++){
      this.setState({settingUp: "Setting up schedule "+(i+1)+" of "+(this.state.showSchSetAlert.length)});

      var slot = this.state.showSchSetAlert[i];
    
      console.log(slot);
      
  
      var mac = slot.mac;
      var ip = JSON.parse(localStorage.getItem(mac)).ip;


        
        var slotnumber = slot.slotnumber !== undefined? slot.slotnumber:slot.slot;

        const response = await setSchedule(ip, schedule, slotnumber);
  
        if(response !== undefined){
            switch(response[0].status){
              case 200 || 302:
                loaded += 1;
                if(loaded>this.state.showSchSetAlert.length)
                {this.setState({settingUp: "NULL"});}
                else
                {this.setState({settingUp: "Setting up schedule "+(loaded)+" of "+(this.state.showSchSetAlert.length)});}
                if(this.state.showSchSetAlert.name !== undefined)
                {toastMsg = "Schedule has been set for "+this.state.showSchSetAlert.name;}
                else{toastMsg = "Schedule has been set for device "+(i+1);}
                this.handleToast();
                this.getSchedulesLocally();
                break;
  
                default:
                  loaded += 1;
                  toastMsg = "Couldn't set schedule.";
                  this.handleToast();
                  if(loaded>this.state.showSchSetAlert.length)
                  {this.setState({settingUp: "NULL"});}
                  else
                  {this.setState({settingUp: "Setting up schedule "+(loaded+1)+" of "+(this.state.showSchSetAlert.length)});}

  
                  break;
            }
  
  
        }else{
            loaded += 1;
            toastMsg = "Couldn't set schedule."
            this.handleToast();
            if(loaded>this.state.showSchSetAlert.length)
            {this.setState({settingUp: "NULL"});}
            else{this.setState({settingUp: "Setting up schedule "+(loaded+1)+" of "+(this.state.showSchSetAlert.length)});}

        }
  
    

    }

    this.setState({ displayPage: "schedules", showSchSetAlert: undefined});


  }else{ 
    toastMsg = "'On Time' and 'Off Time' cannot be the same.";
    this.handleToast();
    
  }



}






getSlotsLocally(mac){
  var unparsedSlots = localStorage.getItem(mac);
  if(unparsedSlots !== null){
    var chip = JSON.parse(unparsedSlots);
    return chip.slots;
    

  }else{
  this.setState({
    showToast: true,
    toastMsg: "Server Error."
  });

  }
}











handleToast() {
  this.setState({
    tshow: !this.state.tshow
  });
}







        render() {

        

            let body;
            
            
              if(this.state.displayPage === "timers"){

                if(this.state.loadingTimers){body=(<LoadingCards />);}
                 else{

                if(this.state.timerData.length > 0){
             
                  body=(
                    this.state.timerData.map((item, index) => {
                               return (                          
                                            
                                       <IonCard style = {{margin: "1rem"}}>
                                        
                                        <IonCardContent style = {{fontSize : "20px"}} 
                                               icon={item.mac}
                                               size="medium"
                                               className="io-icon"
                                               onClick={() => this.onCardClick(item, item.slot, "timer")}>
                                           <ion-grid>


                                             <ion-row>
                                             <ion-col size="5" >
                                                  <ion-row >
                                                  <ion-col style={{margin: "auto", textAlign: "center"}} >
                                                  <DisplayIconComponent icon={item.icon} />
                                                  </ion-col>
                                                  </ion-row>

                                                  <ion-row>
                                                  <ion-col style={{margin: "auto", textAlign: "center"}} size="10" >
                                                    {item.name}
                                                 </ion-col>
                                                 </ion-row>
                                                 
                                               </ion-col>


                                               <ion-col style={{margin: "auto", textAlign: "center"}} size="7"> 
                                               <IonLabel  color={item.color !== undefined?item.color:"dark"}>{item.timer}</IonLabel>
                                               </ion-col>
                                              
                                             </ion-row>
                                             
                                            
                                            
                                             <ion-row>
                                             
                                               
                                               <ion-col style={{ textAlign: "right", margin: "auto"}} >
                                                 <IonSegmentButton
                                                  className="delete-btn"
                                                   onClick={() => this.showAlertFn(item.mac, item.slot, "timer")}>
                                                   <IonIcon icon={trash}
                                                   color="dark"/>
                                                 </IonSegmentButton>
                                                
                                               </ion-col>
                                             </ion-row>
                                            
                                              
                                             </ion-grid>
                                        </IonCardContent>
                                        </IonCard>
                                     
                                );
                      })
                    );
                    
                  }else{
                    body=(
                      <div>
                        <IonImg  className="not-found" src={notFound}>

                        </IonImg>
                         <p className="no-content-msg">
                          Did not find any 'Timers'. To set a timer that turns off a device,
                          navigate to the room your device is set-up in then, 
                          press and hold the device till a popup appears.  
                          Then, select the 'Set Timer' option.
                      </p>
                      </div>
                     

                    );
                  }

              }
            }


              if(this.state.displayPage === "schedules"){

                if(this.state.loadingSchedules){body=(<LoadingCards />);}
                else{
                if(this.state.schedulerData.length > 0){
                  console.log("Scheduler Data"+JSON.stringify(this.state.schedulerData) );
                  body=(
                    this.state.schedulerData.map((item, index) => {
                               return (                  
                              
                                       <IonCard style = {{margin: "1rem"}}>
                                        
                                        <IonCardContent 
                                               icon={item.mac}
                                               className="io-icon"
                                               onClick={() => this.onCardClick(item, item.slotnumber, "scheduler")}
                                             >
                                           <ion-grid>


                                             <ion-row>
                                               <ion-col size="4" >
                                                  <ion-row >
                                                  <ion-col style={{margin: "auto", textAlign: "center"}} >
                                                  <DisplayIconComponent icon={item.icon} />
                                                  </ion-col>
                                                  </ion-row>

                                                  <ion-row>
                                                  <ion-col style={{margin: "auto", textAlign: "center"}} size="10" >
                                                    {item.slotname}
                                                 </ion-col>
                                                 </ion-row>
                                                 
                                               </ion-col>
                                               
                                             
                                               

                                               <ion-col size="7" >
                                                 <ion-row class="ion-justify-content-between" style={{paddingTop: "1rem"}}>
                                                 <ion-col > 
                                                  On
                                                 </ion-col>
                                                 <ion-col> 
                                                  {item.on}
                                                 </ion-col>
                                                 </ion-row>
                                                 <IonItemDivider mode="md" class="ion-align-items-center"/>
                                                 <ion-row class="ion-justify-content-between" style={{paddingTop: "2rem"}}>
                                                 <ion-col> 
                                                  Off {(item.nextDay)?" (Next Day) ":"" }
                                                 </ion-col>
                                                 <ion-col > 
                                                  {item.off}
                                                  </ion-col>
                                                 </ion-row>
                                               </ion-col>

 
                                             </ion-row>

                                             <ion-row >

                                             <ion-col> 
                                             <RepeatDisplay repeat={item.repeat} />
                                             </ion-col>

                                             <ion-col  size="2">
                                                 <IonButton
                                                   onClick={() => this.showAlertFn(item.mac, item.slotnumber, "schedule")}
                                                   fill="clear"
                                                   >
                                                   <IonIcon icon={trash}
                                                   color="dark"/>
                                                 </IonButton>
                                              </ion-col>
                                            
                                                 
                                                
                                             </ion-row>
                                            
                                             </ion-grid>
                                        </IonCardContent>
                                        </IonCard>
                                     
                                );
                    })
                  );
    
                  }else{
                    body=(
                      <div>
                        <IonImg  className="not-found" src={notFound}>

                        </IonImg>
                         <p className="no-content-msg">
                          Did not find any 'Schedules'. To schedule a device,
                          navigate to the room your device is set-up in then, 
                          press and hold the device till the popup appears.  
                          Then, select the 'Set Schedule' option.
                      </p>
                      </div>
                     

                    );
                  }

              }
            }   
          
            return (
              <IonContent>


                  <IonHeader class="ion-no-border">
                      <IonToolbar  mode="ios" style={{marginTop: "5%", textAlign: "center"}} >
                    

                        <IonTitle slot="secondary">AUTOMATION</IonTitle>
                        </IonToolbar>
                        <IonToolbar>
                          <IonSegment mode="ios" value={this.state.displayPage} style={{textAlign: "center", width: "80%", padding: "1%"}}>
                              <IonSegmentButton type="button" value="timers"
                              onClick={() => this.timerOnClick()}>

                                <IonLabel>Timer</IonLabel>
                              </IonSegmentButton>
                              <IonSegmentButton type="button" value="schedules" 
                              onClick={() => this.schedulerOnClick()}
                              >
                                <IonLabel>Scheduler</IonLabel>
                              </IonSegmentButton>
                            </IonSegment>
                            </IonToolbar>
                           
                           

                    </IonHeader>

                 

                  <IonPopover
                  isOpen={((this.state.showTimSetAlert !== undefined) && !this.state.showTimDelAlert)?true:false}
                  onDidDismiss={() => {this.setState(() => ({showTimSetAlert: undefined}));}}>
                    <IonItem color="dark">{this.state.timSetAlertName}</IonItem>
                  <IonItem>
                  <IonLabel>Timer:<br/>(HH:MM:SS)</IonLabel>
                  <IonDatetime 
                    mode="ios"
                    value={"00:00:00"}
                    onIonChange={e => {timerDur = e.detail.value}}
                    displayFormat="HH:mm:ss"
                    />
                 </IonItem>
                    <IonButton
                    expand="block"
                    shape="round"
                    onClick={() => this.setTimer()}>
                        <IonIcon
                        style={{padding: "0.25em"}}
                        icon={timerOutline}
                        size="medium"
                        color="light"
                        className="io-icon"
                          />Set Timer
                    </IonButton>
                  </IonPopover>
              

                  <IonPopover
                    mode="md"
                    isOpen={((this.state.showSchSetAlert !== undefined) && !this.state.showSchDelAlert)?true:false}
                    onDidDismiss={() => this.setState(() => ({showSchSetAlert: undefined}))}>
                            
                            <IonList
                              mode="md">
                              <IonTitle text-center>{this.state.schSetAlertName}</IonTitle>
                              <IonItem>
                                On Time
                                    <TimeInput
                                    mode='12h'
                                    onLoad={setOnTim = new Date()}
                                    onChange={(time) => setOnTim = time}
                                  />
                              </IonItem>
                              <IonItem >
                                Off Time
                                    <TimeInput
                                    mode='12h'
                                    onLoad={setOffTim = new Date()}
                                    onChange={(time) => setOffTim = time}
                                  />
                              </IonItem>

                              <IonItem lines="none">
                              <IonGrid>
                                    <IonRow>
                                      <RepeatSelector repeat ={this.state.repeat}/>
                                    </IonRow>
                                </IonGrid>
                                </IonItem>
                              
                              <IonButton style={{display:"block", textAlign: "center"}} onClick={this.setSchedule.bind(this)}>Schedule</IonButton>
                            </IonList>

                                       
                                         
                  </IonPopover>
                  

                 


                  <IonAlert
                        isOpen={this.state.showTimDelAlert}
                        onDidDismiss={() => this.setState(() => ({showTimDelAlert: false, showTimSetAlert: undefined}))}
                        header={'Timer'}
                        message={'<strong>Are you sure you want to delete?</strong>'}
                        buttons={[
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                              console.log('Confirm Cancel');
                            }
                          },
                          {
                            text: 'Okay',
                            handler: () => this.deleteTimer()
                          }
                        ]}
                      />



                      <IonAlert
                        isOpen={this.state.showSchDelAlert}
                        onDidDismiss={() => this.setState(() => ({showSchDelAlert: false, showSchSetAlert: undefined}))}
                        header={'Scheduler'}
                        message={'<strong>Are you sure you want to delete?</strong>'}
                        buttons={[
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                              console.log('Confirm Cancel');
                            }
                          },
                          {
                            text: 'Okay',
                            handler: () => this.deleteSchedule()
                          }
                        ]}
                      />

                   
                    <ion-scroll scrollable="true">
                    {body}
                    </ion-scroll>

                    <IonLoading
                    isOpen={this.state.settingUp !== "NULL"?true:false}
                    onDidDismiss={() => this.setState({settingUp: "NULL"})}
                    message={this.state.settingUp}
                  />

                    <IonToast
                      isOpen={this.state.tshow}
                      onDidDismiss={() => this.handleToast()}
                      message={toastMsg}
                      duration={3000}
                    />
                   
                 </IonContent>   
              
                
            );
        }
}

export default AutomationPage;
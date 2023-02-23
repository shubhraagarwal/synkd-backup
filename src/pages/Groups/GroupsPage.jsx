import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonModal,
  IonToast,
  IonListHeader,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonInput,
  IonPopover,
  IonLoading,
  IonImg,
} from "@ionic/react";

import ScriptTag from "react-script-tag";

import {
  SOCKETIOHOST,
  SOCKETIOLIB,
  createGroup,
  retrieveSlots,
} from "../ServerRequests/globalApi";
import { toggleSlot, getChipMac } from "../ServerRequests/localApi";
import { addCircle, personCircleSharp } from "ionicons/icons";
import React from "react";
import LongPressPopover from "./UI/LongPressPopover";
import GroupGrid from "./UI/GroupGrid";
import DisplayIconComponent from "../MiscUiComponents/DisplayIconComponent";
import IconPicker from "../MiscUiComponents/IconPicker";
import "./GroupsPage.css";
import { setTimeout } from "timers";
import { onSlot, offSlot } from "../ServerRequests/localApi";
import notFound from "../../images/device-icons/notFound/notFound.svg";
import { Plugins } from "@capacitor/core";
const { Network } = Plugins;

var username = JSON.parse(localStorage.getItem("username"));
var localSocket;
var createGroupAlert = false;
var toastMsg = "";

class GroupsPage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = true;

    this.state = {
      loading: false,
      groups: [""],
      showCreateGroupAlert: createGroupAlert,
      longPressedGroup: undefined,
      showAddDeviceAlert: false,
      showEditGroupModal: false,
      addSlotToGroup: {},
      groupname: "",
      showPopover: 0,
      showIconPickerModal: false,
      showToast: false,
      reloadGroups: true,
      setGroupState: 0,
      retrievingState: false,
      networkType: undefined,
      networkConnected: undefined,
    };

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.properties !== undefined) {
      this.setState({
        showCreateGroupAlert: true,
        addSlotToGroup: {
          mac: this.props.properties.mac,
          slotnumber: this.props.properties.slotnumber,
        },
      });
    }

    this.networkStatusSetup();
  }

  componentWillUnmount() {
    try {
      if (window.socket !== undefined) {
        window.socket.close();
      }
      console.log("Disconnected Sockets.");
    } catch (err) {
      console.log(err);
    }

    this._isMounted = false;
  }

  async networkStatusSetup() {
    Network.removeAllListeners();
    Network.addListener("networkStatusChange", (status) => {
      this.setState({
        networkConnected: status.connected,
        networkType: status.connectionType,
      });
      console.log("Network status changed " + status.connectionType);
    });

    var logCurrentNetworkStatus = await Network.getStatus();
    if (logCurrentNetworkStatus !== undefined) {
      this.setState({
        networkConnected: logCurrentNetworkStatus.connected,
        networkType: logCurrentNetworkStatus.connectionType,
      });
      console.log("Network status: " + logCurrentNetworkStatus.connectionType);
    }
  }

  refresh(event) {
    this.setState({ reloadGroups: true });
    setTimeout(() => {
      event.target.complete();
    }, 800);

    this.networkStatusSetup();
  }

  cloudSocket() {
    const script = document.createElement("script");
    script.innerHTML += "var socket = io.connect('" + SOCKETIOHOST + "');";
    script.innerHTML += "window.socket = socket;";
    script.async = true;
    document.body.appendChild(script);

    var groups = this.state.groups;

    if (groups !== undefined) {
      if (groups.length !== 0) {
        var macIds = [];
        console.log(groups);
        for (var i = 0; i < groups.length; i++) {
          for (var j = 0; j < groups[i].slots.length; j++) {
            var contains = false;
            for (var k = 0; k < macIds.length; k++) {
              if (macIds[k] === groups[i].slots[j].mac) {
                contains = true;
                break;
              }
            }
            if (!contains) {
              macIds[i] = groups[i].slots[j].mac;
            }
          }
        }

        for (var l = 0; l < macIds.length; l++) {
          var macJson = JSON.parse(JSON.stringify({ mac: macIds[l] }));
          window.socket.emit("subscribe", macJson);
          console.log("Socket IO connected, mac:" + macIds);
        }
      }
    }

    window.socket.on("state", (data) => {
      console.log("sio state: " + data);
      this.setState({ chipstate: data.state, setGroupState: data });
    });
  }

  websocketfn() {
    var groups = this.state.groups;

    if (groups !== undefined) {
      var macIds = [];
      console.log(groups);
      for (var i = 0; i < groups.length; i++) {
        for (var j = 0; j < groups[i].slots.length; j++) {
          var contains = false;
          for (var k = 0; k < macIds.length; k++) {
            if (macIds[k] === groups[i].slots[j].mac) {
              contains = true;
              break;
            }
          }
          if (!contains) {
            macIds[i] = groups[i].slots[j].mac;
          }
        }
      }

      for (var l = 0; l < macIds.length; l++) {
        var IP = JSON.parse(localStorage.getItem(macIds[l])).ip;
        localSocket = new WebSocket("ws://" + IP + ":81/");
        console.log("Local IP:" + IP);

        var ctx = this;

        localSocket.onmessage = function (evt) {
          var type = evt.data.split("~")[0];
          var mac = evt.data.split("~")[1];
          var chipstate = evt.data.split("~")[2];

          if (type === "state") {
            console.log("lws");
            ctx.setState({ setGroupState: mac });
          }
        };
        localSocket.onopen = function (evt) {
          console.log("Local WS Open");
        };

        localSocket.onclose = function (evt) {
          console.log("Local WS CLosed");
        };
      }
    }
  }

  handleButtonPress(groupid) {
    console.log("Pressed:" + groupid);
    this.buttonPressTimer = setTimeout(() => this.dispPopover(groupid), 500);
  }
  dispPopover(groupid) {
    this.setState(() => ({ showPopover: groupid }));
  }
  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
  }

  handleToast() {
    this.setState({ showToast: !this.state.showToast });
  }

  async onButtonClick(groupClicked) {
    console.log("group clicked" + groupClicked);

    var slots = groupClicked.slots;
    var groups = this.state.groups;
    console.log(groups);
    console.log(slots);
    for (var i = 0; i < slots.length; i++) {
      console.log(slots[i]);

      for (var j = 0; j < groups.length; j++) {
        console.log("groups[" + j + "]: " + groups[j]._id);
        console.log("Clicked id: " + JSON.stringify(groupClicked._id));

        if (groups[j]._id === groupClicked._id) {
          if (groups[j].state === 2) {
            this.turnOff(slots[i].slotnumber, slots[i].mac);
          } else {
            this.turnOn(slots[i].slotnumber, slots[i].mac);
          }
        }
      }
    }
  }

  // async getSlotState(slotnumber, mac){

  //   var ip = JSON.parse(localStorage.getItem(mac)).ip;
  //   await this.getStateLocally(ip, mac);

  //   var stateInt = parseInt(JSON.parse(localStorage.getItem(mac)).state);
  //   var slotcount = parseInt(JSON.parse(localStorage.getItem(mac)).slotcount);
  //   var stateBin = stateInt.toString(2);
  //   var arr = stateBin.split("").map(Number);

  //     var stateBinArr = [];
  //     var difference = parseInt(slotcount) - parseInt(arr.length);

  //     for(var i = 0; i < difference; i++){stateBinArr[i] = 0;}
  //     for(var j = 0; j < arr.length; j++){stateBinArr[j+difference] = arr[j]; }

  //     return stateBinArr[slotnumber-1];

  // }

  // async getStateLocally(ip, mac){
  //   this.setState({loading: false});

  //       const response = await chipState(ip);

  //       if(response[0] !== undefined){

  //         switch(response[0].status){

  //             case 200:
  //               var chip = JSON.parse(localStorage.getItem(mac));
  //               chip.state = response[0].data.state;
  //               localStorage.setItem(mac, JSON.stringify(chip));
  //               this.setState({loading: false});

  //               break;

  //               default:
  //                 console.log("Could not get chip state. MAC: "+mac);
  //                 this.setState({loading: false});

  //                 break;

  //         }
  //       }else{
  //         console.log("Could not get chip state. MAC "+mac);
  //         this.setState({loading: false});

  //       }

  //  }

  async turnOn(slotnumber, mac) {
    this.setState({ loading: true });

    console.log("Turn On" + slotnumber + "MAC" + mac);
    // toastMsg = "Please wait for the group state to reflect here";
    // this.setState({showToast: true});
    var slotnum = slotnumber - 1;
    var IP = JSON.parse(localStorage.getItem(mac)).ip;

    const isIPCorrect = await this.verifyMac(mac);
    if (isIPCorrect) {
      const response = await onSlot(IP, slotnum);

      if (response !== undefined) {
        switch (response[0].status) {
          case 200 || 302:
            console.log("Turned On slot " + slotnum + " via local ws.");
            this.setState({ loading: false });

            break;

          default:
            console.log(
              "Failed to turn on slot via local ws. Attempting turn on via cloud.(SocketIO)"
            );
            console.log("Failed to turn on slot via local ws.");
            window.socket.emit("turn-on", { mac: mac, slot: slotnum });
            window.socket.emit("timer-start", { mac: mac, slot: slotnum });
            this.setState({ loading: false });

            break;
        }
      } else {
        console.log(
          "Failed to turn on slot via local ws. Attempting turn on via cloud.(SocketIO)"
        );
        try {
          window.socket.emit("turn-on", { mac: mac, slot: slotnum });
          window.socket.emit("timer-start", { mac: mac, slot: slotnumber });
        } catch {
          toastMsg = "Failed to turn on device. Please try again.";
          this.setState({ showToast: true });
          this.handleToast();
        }
        this.setState({ loading: false });
      }
    } else {
      console.log(
        "Failed to turn on slot via local ws. Attempting turn on via cloud.(SocketIO)"
      );
      try {
        window.socket.emit("turn-on", { mac: mac, slot: slotnum });
        window.socket.emit("timer-start", { mac: mac, slot: slotnumber });
      } catch {
        toastMsg = "Failed to turn on device. Please try again.";
        this.setState({ showToast: true });
        this.handleToast();
      }
      this.setState({ loading: false });
    }
  }

  async turnOff(slotnumber, mac) {
    // console.log("Turn Off"+slotnumber+"MAC"+mac);
    // toastMsg = "Please wait for the group state to reflect here";
    this.setState({ loading: true });
    var slotnum = slotnumber - 1;
    var IP = JSON.parse(localStorage.getItem(mac)).ip;

    const isIPCorrect = await this.verifyMac(mac);
    if (isIPCorrect) {
      const response = await offSlot(IP, slotnum);

      if (response !== undefined) {
        switch (response[0].status) {
          case 200 || 302:
            console.log("Turned Off slot " + slotnum + " via local ws.");
            this.setState({ loading: false });

            break;

          default:
            console.log(
              "Failed to turn off slot via local ws. Attempting turn off via cloud.(SocketIO)"
            );
            console.log("Failed to turn off slot via local ws.");
            window.socket.emit("turn-off", { mac: mac, slot: slotnum });
            window.socket.emit("timer-start", { mac: mac, slot: slotnum });
            this.setState({ loading: false });

            break;
        }
      } else {
        console.log(
          "Failed to turn off slot via local ws. Attempting turn off via cloud.(SocketIO)"
        );
        try {
          window.socket.emit("turn-off", { mac: mac, slot: slotnum });
          window.socket.emit("timer-start", { mac: mac, slot: slotnumber });
        } catch {
          toastMsg = "Failed to turn off device. Please try again.";
          this.setState({ showToast: true });
          this.handleToast();
        }
        this.setState({ loading: false });
      }
    } else {
      console.log(
        "Failed to turn off slot via local ws. Attempting turn off via cloud.(SocketIO)"
      );
      try {
        window.socket.emit("turn-off", { mac: mac, slot: slotnum });
        window.socket.emit("timer-start", { mac: mac, slot: slotnumber });
      } catch {
        toastMsg = "Failed to turn off device. Please try again.";
        this.setState({ showToast: true });
        this.handleToast();
      }
      this.setState({ loading: false });
    }
  }

  async toggle(slotnumber, mac) {
    this.setState({ loading: true });

    console.log("Toggle" + slotnumber + "MAC" + mac);
    // toastMsg = "Please wait for the group state to reflect here";
    // this.setState({showToast: true});
    var slotnum = slotnumber - 1;
    var IP = JSON.parse(localStorage.getItem(mac)).ip;

    const isIPCorrect = await this.verifyMac(mac);
    if (isIPCorrect) {
      const response = await toggleSlot(IP, slotnum);

      if (response !== undefined) {
        switch (response[0].status) {
          case 200 || 302:
            console.log("Toggled slot " + slotnum + " via local ws.");
            this.setState({ loading: false });

            break;

          default:
            console.log(
              "Failed to toggle slot via local ws. Attempting toggle via cloud.(SocketIO)"
            );
            console.log("Failed to toggle slot via local ws.");
            window.socket.emit("toggle", { mac: mac, slot: slotnum });
            window.socket.emit("timer-start", { mac: mac, slot: slotnum });
            this.setState({ loading: false });

            break;
        }
      } else {
        console.log(
          "Failed to toggle slot via local ws. Attempting toggle via cloud.(SocketIO)"
        );
        try {
          window.socket.emit("toggle", { mac: mac, slot: slotnum });
          window.socket.emit("timer-start", { mac: mac, slot: slotnumber });
        } catch {
          toastMsg = "Failed to toggle device. Please try again.";
          this.setState({ showToast: true });
          this.handleToast();
        }
        this.setState({ loading: false });
      }
    } else {
      console.log(
        "Failed to toggle slot via local ws. Attempting toggle via cloud.(SocketIO)"
      );
      try {
        window.socket.emit("toggle", { mac: mac, slot: slotnum });
        window.socket.emit("timer-start", { mac: mac, slot: slotnumber });
      } catch {
        toastMsg = "Failed to toggle device. Please try again.";
        this.setState({ showToast: true });
        this.handleToast();
      }
      this.setState({ loading: false });
    }
  }

  async createGroup() {
    var icon = this.state.addSlotToGroup.icon;
    var homeid = JSON.parse(localStorage.getItem("homeid"));
    var data;
    if (Object.keys(this.state.addSlotToGroup).length === 0) {
      var data = JSON.stringify({
        name: this.state.groupname,
        homeid: homeid,
        icon: icon !== undefined ? icon : { iconname: "LIGHTS", int: 1 },
      });
    } else {
      var data = JSON.stringify({
        name: this.state.groupname,
        homeid: homeid,
        slots: {
          mac: this.state.addSlotToGroup.mac,
          slotnumber: this.state.addSlotToGroup.slotnumber,
        },
        icon: icon !== undefined ? icon : { iconname: "LIGHTS", int: 1 },
      });
    }

    console.log(data);
    const response = await createGroup(data);

    if (response[0] !== undefined) {
      switch (response[0].status) {
        case 200:
          console.log(response[0].data);
          toastMsg = "Created Group.";
          this.setState({ showToast: true });
          // this.handleToast();
          this.setState({ showCreateGroupAlert: false });
          this.setState({ reloadGroups: true });
          break;

        default:
          toastMsg = "Server error. Could not create group.";
          this.setState({ showToast: true });
          // this.handleToast();
          break;
      }
    }
  }

  async verifyMac(mac) {
    var IP = JSON.parse(localStorage.getItem(mac)).ip;

    const response = await getChipMac(IP);

    if (response !== undefined) {
      console.log(response[0]);

      switch (response[0].status) {
        case 200:
          if (response[0].data.mac === mac) {
            return true;
          } else {
            console.log("Incorrect local IP.");
            this.getIPfromCloud(mac);
            return false;
          }

        case 404:
          console.log("Could not verify local IP. Error:" + response[0].data);
          return false;

        default:
          console.log("Could not verify local IP. Error:" + response[0].data);
          return false;
      }
    } else {
      return false;
    }
  }

  async getIPfromCloud(mac) {
    var data = JSON.stringify({ mac: mac });
    console.log("Attempting to get new ip of " + mac);

    const response = await retrieveSlots(data);

    if (response !== undefined) {
      console.log(response[0]);
      switch (response[0].status) {
        case 200:
          var existing = localStorage.getItem(mac);
          existing.ip = response[0].data.ip;
          localStorage.setItem(mac, JSON.stringify(existing));
          console.log("Attempt to retrieve ip from cloud sucessful.");

          this.websocketfn();
          break;

        default:
          console.log("Could not retrieve chip ip from cloud.");
          break;
      }
    } else {
      console.log("Could not retrieve chip ip from cloud.");
    }
  }

  render() {
    let groupgrid;
    let group = this.state.longPressedGroup;
    let popover;

    if (group !== undefined) {
      popover = (
        <LongPressPopover
          group={group}
          component={(comp) => this.props.component(comp)}
          onDidDismiss={() => {
            this.setState(() => ({
              longPressedGroup: undefined,
              reloadGroups: true,
            }));
          }}
        />
      );
    }

    if (this.state.networkType !== "wifi" && this.state.networkType !== "4g") {
      groupgrid = (
        <div>
          <IonImg className="not-found" src={notFound}></IonImg>
          <p className="no-content-msg">
            You must be connected to your home WiFi to turn on or turn off
            devices as a group. You can still turn on or turn off a device by
            navigating to the room your device is set-up.
          </p>
        </div>
      );
    } else {
      groupgrid = (
        <div style={{ height: "100%", width: "100%" }}>
          <GroupGrid
            groups={(groups) => {
              this.setState(() => ({ groups: groups, reloadGroups: false }));
            }}
            reload={this.state.reloadGroups}
            shouldSetState={
              this.state.setGroupState === 0 ? false : this.state.setGroupState
            }
            didSetState={() => this.setState({ setGroupState: 0 })}
            isRetrievingState={(state) =>
              this.setState({ retrievingState: state })
            }
            isShortPressed={(groupid) => this.onButtonClick(groupid)}
            isLongPressed={(g) =>
              this.setState(() => ({ longPressedGroup: g }))
            }
          />

          <ScriptTag
            isHydrating={true}
            onLoad={() => this.cloudSocket()}
            type="text/javascript"
            src={SOCKETIOLIB}
          />
        </div>
      );

      if (this.state.groups.length === 0 && !this.state.reloadGroups) {
        groupgrid = (
          <div>
            <IonButton
              className="add-new-slot-btn ion-no-padding"
              fill="clear"
              shape="round"
              size="large"
              expand="block"
              color="dark"
              onClick={() => this.setState({ showCreateGroupAlert: true })}
            >
              <IonIcon
                color="dark"
                fill="white"
                style={{ fontSize: "150px" }}
                icon={addCircle}
              />
            </IonButton>
            <br />
            <p className="create-group-label">CREATE A GROUP</p>
            <br />
          </div>
        );
      }
    }

    return (
      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={(event) => this.refresh(event)}
        >
          <IonRefresherContent />
        </IonRefresher>
        <IonHeader class="ion-no-border">
          <IonToolbar mode="ios">
            <IonButtons slot="start">
              <IonMenuButton
                menu="first"
                fill="solid"
                className="icon-btn ion-no-padding"
                shape="round"
                size="large"
                expand="block"
                color="medium"
              >
                <IonIcon
                  icon={personCircleSharp}
                  size="large"
                  className="io-icon"
                />
              </IonMenuButton>
            </IonButtons>
            <IonTitle slot="secondary">GROUPS</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonPopover
          isOpen={this.state.showCreateGroupAlert}
          onDidDismiss={() => {
            this.setState({ showCreateGroupAlert: false });
          }}
          cssClass="create-popover"
        >
          <IonListHeader className="popover-title">Create Group</IonListHeader>

          <IonButton
            style={{ height: "100%" }}
            size="large"
            expand="block"
            color="light-tint"
            onClick={() => this.setState({ showIconPickerModal: true })}
          >
            <DisplayIconComponent
              icon={
                this.state.addSlotToGroup !== undefined
                  ? this.state.addSlotToGroup.icon !== undefined
                    ? this.state.addSlotToGroup.icon
                    : { iconname: "LIGHTS", int: 1 }
                  : { iconname: "LIGHTS", int: 1 }
              }
              size="large"
              className="io-icon"
              color="light"
            />
          </IonButton>
              
          <IonInput
            placeholder="Group Name"
            type="stacked"
            inputMode="text"
            maxlength="70"
            mode="md"
            value={this.state.groupname}
            onIonChange={(data) => {
              this.setState({ groupname: data.target.value });
            }}
          />
          <IonButton
            expand="block"
            shape="round"
            onClick={() => this.createGroup()}
          >
            Done
          </IonButton>
        </IonPopover>

        {groupgrid}
        {popover}

        <IonLoading
          isOpen={this.state.loading}
          onDidDismiss={() => this.setState({ loading: false })}
          message={"Please wait..."}
        />
        <IonLoading
          isOpen={this.state.retrievingState}
          message={"Setting Group State..."}
        />

        <IonModal isOpen={this.state.showIconPickerModal} onClose={this.close}>
          <IconPicker
            properties={{}}
            component={(comp) => {
              var slot = this.state.addSlotToGroup;
              slot.icon = comp.icon;
              console.log(this.state.addSlotToGroup);
              this.setState({
                addSlotToGroup: slot,
                showIconPickerModal: false,
              });
            }}
            onDidDismiss={() => this.setState({ showIconPickerModal: false })}
          />
        </IonModal>

        <IonToast
          isOpen={this.state.showToast}
          onDidDismiss={() => {
            this.setState(() => ({ showToast: false }));
          }}
          message={toastMsg}
          duration={3000}
        />
      </IonContent>
    );
  }
}

export default GroupsPage;

/* This page loads all the slots available for a chip*/

import {
  IonContent,
  IonIcon,
  IonButton,
  IonLabel,
  IonItem,
  IonSegmentButton,
  IonSegment,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  IonPopover,
  IonLoading,
  IonActionSheet,
  IonModal,
  IonListHeader,
  IonImg,
  IonInput,
} from "@ionic/react";
import {
  hardwareChip,
  addCircle,
  tvSharp,
  bulb,
  arrowBack,
  pencilSharp,
  timerSharp,
  calendarSharp,
  trash,
} from "ionicons/icons";
import React from "react";
import { withRouter } from "react-router";
//import Websocket from "react-websocket";
import ScriptTag from "react-script-tag";
import "./Slots.css";
import AddToGroupModal from "./UI/AddToGroupModal";
import SlotGrid from "./UI/SlotGrid";
import bulbon from "../../images/device-icons/lights/bulbon.png";
import bulboff from "../../images/device-icons/lights/bulboff.png";
import {
  retrieveSwitchControllers,
  SOCKETIOLIB,
} from "../ServerRequests/globalApi";
import SetupBuilderChipModalComponentHolder from "../BuilderChip/SetupBuilderChipModalComponentHolder";
import SetupSlotModalComponentHolder from "./SetupSlotModalComponentHolder";
import { toggleSlot, getChipMac, startTimer } from "../ServerRequests/localApi";
import { SOCKETIOHOST, retrieveSlots } from "../ServerRequests/globalApi";
import io from "socket.io-client";
import WebSocket from "ws";
const socket = io();

var defaultChipName = "";
var iconname = "";

const contentStyle = {
  height: "90px",
  justifyContent: "center",
  width: "90px",
};

const test = {
  borderRadius: "1rem",
  width: "15rem",
  height: "12rem",
  margin: "0px auto",
  display: "table",
  position: "absolute",
  left: "50%",
  right: "50%",
  top: "50%",
  border: "1px solid",
  transform: "translate(-50%, -50%)",
  padding: "5px 20px 13px",
  background: "rgb(255, 255, 255)",
};

var toastMsg = "";

var data = "";
var auth_token = "";
var IP = "";
var check = "";
var username = JSON.parse(localStorage.getItem("username"));
var slot_count;
var localSocket;

class RoomComponent extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = true;

    auth_token = JSON.parse(localStorage.getItem("token"));
    this.state = {
      roomid: "",
      switchitems: [],
      name: "",
      state: "0",
      mac: "",
      ip: "",
      showPopover: undefined,
      slotCount: 8,
      showToast: false,
      showGroupActionSheet: false,
      showPickGroupModal: false,
      showSetupBuilderChipModal: false,
      showSetupSlotModal: false,
      toggleAttemting: false,
      toggleSwitch: false,
      editRoomName: false,
      roomName: "",
    };
  }
  async editName() {
    try {
      fetch("https://clickademy.in/room/update-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth_token,
        },
        body: JSON.stringify({
          roomid: this.state.roomid,
          roomname: "bal bla",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  }
  toggleSwitch() {
    this.setState({ toggleSwitch: !this.state.toggleSwitch });
  }

  addSlot() {
    this.setState({ showSetupSlotModal: true });
  }
  async deleteSlot() {
    //const token = await  localStorage.getItem("token");

    try {
      fetch("https://clickademy.in/switchcontrollers/delete-slot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth_token,
        },
        body: JSON.stringify({
          mac: this.state.mac,
          slotnumber: this.state.slotnumber,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
    console.log("Delete was clicked!");
  }
  async deleteRoom() {
    console.log("Delete room Clicked!!");
    try {
      fetch("https://clickademy.in/switchcontrollers/room/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth_token,
        },
        body: JSON.stringify({
          roomid: this.state.roomid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  showSetupBuilderChipModal() {
    this.setState({ showSetupBuilderChipModal: true });
  }

  closeSetupBuilderChipModal() {
    this.setState({ showSetupBuilderChipModal: false });
  }

  refreshPage() {
    window.location.reload();
  }

  sloticonfn(e) {
    if (e === tvSharp) {
      iconname = tvSharp;
      return iconname;
    }
    if (e === bulb) {
      iconname = bulb;
      return iconname;
    }
  }

  componentDidMount() {
    this._isMounted = true;

    this.LoadChips();

    document.addEventListener("ionBackButton", (ev) => {
      ev.detail.register(10, () => {
        this.props.component({ ComponentType: "HOME" });
        console.log("Back Pressed");
      });
    });
  }

  componentWillUnmount() {
    try {
      if (window.socket !== undefined) {
        window.socket.close();
      }
      if (localSocket !== undefined) {
        localSocket.close();
      }
      console.log("Disconnected Sockets.");
    } catch (err) {
      console.log(err);
    }

    this._isMounted = false;
  }

  cloudSocket() {
    const script = document.createElement("script");
    script.innerHTML += "var socket = io.connect('" + SOCKETIOHOST + "');";
    script.innerHTML += "window.socket = socket;";
    script.async = true;
    document.body.appendChild(script);
    console.log("entered cloud socket:" + String(window.socket));

    var chips = JSON.parse(localStorage.getItem(this.state.roomid));
    if (chips !== null) {
      for (var i = 0; i < chips.length; i++) {
        var macJson = JSON.parse(JSON.stringify({ mac: chips[i].mac }));
        window.socket.emit("subscribe", macJson);
      }
    }

    window.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    window.socket.on("state", (data) => {
      console.log("sio state: " + data.state);
      this.setState({ chipstate: data.state });
    });

    window.socket.on("connected", (data) => {
      console.log("connected to socketio");
    });

    window.socket.on("connection", (data) => {
      console.log("connection to socketio");
    });

    window.socket.on("connect", (data) => {
      console.log("connect to socketio");
    });
  }

  websocketfn() {
    IP = JSON.parse(localStorage.getItem(this.state.mac)).ip;
    localSocket = new WebSocket("ws://" + IP + ":81/");
    console.log("Local IP:" + IP);

    var ctx = this;

    localSocket.onmessage = function (evt) {
      var type = evt.data.split("~")[0];
      var mac = evt.data.split("~")[1];
      var chipstate = evt.data.split("~")[2];

      if (mac === this.state.mac && type === "state") {
        console.log("lws");
        ctx.updateChipState(chipstate);
      }
    };
    localSocket.onopen = function (evt) {
      console.log("Local WS Open");
    };

    localSocket.onclose = function (evt) {
      console.log("Local WS CLosed");
    };
  }

  handleToast() {
    this.setState({
      tshow: !this.state.tshow,
    });
  }

  async onClickBtnFn(slotnumber) {
    console.log("Tapped", slotnumber);
    this.setState({ toggleAttemting: true });
    var slotnum = slotnumber - 1;
    IP = JSON.parse(localStorage.getItem(this.state.mac)).ip;

    const isIPCorrect = await this.verifyMac();
    if (isIPCorrect) {
      var response = await toggleSlot(IP, slotnum);

      if (response !== undefined) {
        switch (response[0].status) {
          case 200 || 302:
            console.log("Toggled slot " + slotnum + " via local ws.");
            break;

          default:
            console.log(
              "Failed to toggle slot via local ws. Attempting toggle via cloud.(SocketIO)"
            );
            console.log("Failed to toggle slot via local ws.");
            window.socket.emit("toggle", {
              mac: this.state.mac,
              slot: slotnum,
            });
            // window.socket.emit("timer-start", { mac: this.state.mac, slot: slotnum });
            break;
        }
      } else {
        console.log(
          "Failed to toggle slot via local ws. Attempting toggle via cloud.(SocketIO)"
        );
        try {
          window.socket.emit("toggle", { mac: this.state.mac, slot: slotnum });
          // window.socket.emit("timer-start", { mac: this.state.mac, slot: slotnumber });
        } catch {
          toastMsg = "Failed to toggle device. Please try again.";
          this.handleToast();
        }
      }
    } else {
      console.log(
        "Failed to toggle slot via local ws. Attempting toggle via cloud.(SocketIO)"
      );
      try {
        window.socket.emit("toggle", { mac: this.state.mac, slot: slotnum });
        // window.socket.emit("timer-start", { mac: this.state.mac, slot: slotnumber });
      } catch {
        toastMsg = "Failed to toggle device. Please try again.";
        this.handleToast();
      }
    }

    this.setState({ toggleAttemting: false });
  }

  async verifyMac() {
    var chips = JSON.parse(localStorage.getItem(this.state.roomid));
    console.log(this.state.roomid);

    for (var i = 0; i < chips.length; i++) {
      if (chips[i] === this.state.mac) {
        IP = JSON.parse(localStorage.getItem(this.state.mac)).ip;
      }
    }

    const response = await getChipMac(IP);

    if (response !== undefined) {
      console.log(response[0]);

      switch (response[0].status) {
        case 200:
          if (response[0].data.mac === this.state.mac) {
            return true;
          } else {
            console.log("Incorrect local IP.");
            this.getIPfromCloud();
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

  async getIPfromCloud() {
    var data = JSON.stringify({ mac: this.state.mac });
    console.log("Attempting to get new ip of " + this.state.mac);

    const response = await retrieveSlots(data);

    if (response !== undefined) {
      console.log(response[0]);
      switch (response[0].status) {
        case 200:
          var existing = JSON.parse(localStorage.getItem(this.state.mac));
          existing.ip = response[0].data.ip;
          localStorage.setItem(this.state.mac, existing);
          console.log("Attempt to retrieve ip from cloud sucessful.");

          // this.websocketfn();
          break;

        default:
          console.log("Could not retrieve chip ip from cloud.");
          break;
      }
    } else {
      console.log("Could not retrieve chip ip from cloud.");
    }
  }

  changeSelectedChip(mac, event) {
    console.log("Selected:" + mac);
    this.setState({ mac: mac });

    if (event !== undefined) {
      if (event.target !== undefined) {
        setTimeout(() => {
          event.target.complete();
        }, 800);
      }
    }
  }

  async LoadChips() {
    var data = JSON.stringify({ roomid: this.props.properties.roomid });

    this.setState({ roomid: this.props.properties.roomid });

    var chips = JSON.parse(localStorage.getItem(this.props.properties.roomid));

    if (chips !== null) {
      if (chips.length > 0) {
        this.setState({ switchitems: chips });
        this.setState({ mac: chips[0].mac });
      }
    }

    const response = await retrieveSwitchControllers(data);

    if (response !== undefined) {
      console.log(response[0]);
      switch (response[0].status) {
        case 200:
          if (response[0].data.switchControllers.length > 0) {
            this.setState({ switchitems: response[0].data.switchControllers });
            localStorage.setItem(
              this.state.roomid,
              JSON.stringify(response[0].data.switchControllers)
            );
            this.setState({ mac: response[0].data.switchControllers[0].mac });

            for (
              var i = 0;
              i < response[0].data.switchControllers.length;
              i++
            ) {
              localStorage.setItem(
                response[0].data.switchControllers[i].mac,
                JSON.stringify(response[0].data.switchControllers[i])
              );
            }
          } else {
            this.setState({ showSetupBuilderChipModal: true });
          }

          break;

        default:
          toastMsg = "Could not retrieve chips from server.";
          this.handleToast();
          break;
      }
    } else {
      toastMsg = "Could not retrieve chips from server.";
      this.handleToast();
    }
  }

  setTimer(item) {
    console.log(item);
    this.setState(() => ({ showPopover: undefined }));
    this.props.component({
      ComponentType: "AUTOMATION",
      ComponentProperties: {
        displayPage: "timers",
        showTimSetAlert: [
          {
            mac: this.state.mac,
            slotnumber: item.slotnumber,
            name: item.slotname,
          },
        ],
        name: item.slotname,
      },
    });
  }

  setSchedule(item) {
    console.log(item);
    this.setState(() => ({ showPopover: undefined }));
    this.props.component({
      ComponentType: "AUTOMATION",
      ComponentProperties: {
        displayPage: "schedules",
        showSchSetAlert: [
          {
            mac: this.state.mac,
            slotnumber: item.slotnumber,
            name: item.slotname,
          },
        ],
        name: item.slotname,
        setMac: this.state.mac,
      },
    });
  }

  addToGroup() {
    this.setState({ showGroupActionSheet: true });
  }

  addToNewGroup() {
    var slotnumber = this.state.showPopover.slotnumber;
    this.setState(() => ({ showPopover: undefined }));
    this.props.component({
      ComponentType: "GROUPS",
      ComponentProperties: {
        showCreateGroupAlert: true,
        slotnumber: slotnumber,
        mac: this.state.mac,
      },
    });
  }

  backButton() {
    this.props.component({ ComponentType: "HOME" });
  }

  render() {
    let roomname = this.props.properties.roomname;

    return (
      <IonContent>
        <ScriptTag
          isHydrating={true}
          onLoad={() => this.cloudSocket()}
          type="text/javascript"
          src={SOCKETIOLIB}
        />
        <IonHeader class="ion-no-border">
          <IonToolbar mode="ios" color="light-tint">
            <IonButton
              slot="start"
              fill="clear"
              color="dark"
              onClick={() => this.backButton()}
            >
              <IonIcon icon={arrowBack} size="medium"></IonIcon>
            </IonButton>
            <IonButton
              onClick={() => {
                this.setState({ editRoomName: !this.state.editRoomName });
              }}
              slot="end"
              fill="clear"
              color="dark"
            >
              EDIT
            </IonButton>
            <IonIcon
              onClick={() => {
                this.deleteRoom();
              }}
              slot="end"
              fill="clear"
              color="dark"
              icon={trash}
              style={{ scale: "125%" }}
            ></IonIcon>
            {!this.state.editRoomName ? (
              <>
                <IonTitle>{roomname}</IonTitle>
              </>
            ) : (
              <>
                <IonInput
                  placeholder="Enter Room Name"
                  onKeyPress={async (e) => {
                    if (e.key === "Enter") {
                      this.setState({ roomName: e.target.value });
                      this.editName();
                    }
                  }}
                />
              </>
            )}
          </IonToolbar>
        </IonHeader>

        <IonSegment
          className="segment"
          scrollable="true"
          mode="md"
          value={defaultChipName}
        >
          {this.state.switchitems.map((item) => {
            return (
              <IonSegmentButton
                type="button"
                id={item.mac}
                onClick={() => {
                  this.changeSelectedChip(item.mac);
                  this.toggleSwitch();
                }}
                value={item.mac}
                className={
                  this.state.mac === item.mac
                    ? "segment-btn-selected"
                    : "segment-btn-unselected"
                }
              >
                <IonLabel
                  color={
                    this.state.mac !== item.mac ? "dark-tint" : "light-tint"
                  }
                  style={{
                    fontSize: "13px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {item.name}{" "}
                  <IonLabel size="4" background="" color="black">
                    {this.state.toggleSwitch ? (
                      <IonImg
                        size="4"
                        style={{ width: "25px" }}
                        src={bulbon}
                        onClick={() => {
                          socket.emit("enable-night-mode", {
                            mac: this.state.mac,
                          });
                          console.log("Night mode enabled");
                          toggleSlot();
                        }}
                      ></IonImg>
                    ) : (
                      <IonImg
                        size="4"
                        style={{ width: "25px" }}
                        src={bulboff}
                        onClick={() => {
                          socket.emit("disable-night-mode", {
                            mac: this.state.mac,
                          });
                          console.log("Night mode disabled");
                          toggleSlot();
                        }}
                      ></IonImg>
                    )}
                  </IonLabel>
                </IonLabel>
              </IonSegmentButton>
            );
          })}
          <IonSegmentButton
            type="button"
            className="segment-btn-unselected"
            onClick={() => this.showSetupBuilderChipModal()}
          >
            <IonIcon
              icon={addCircle}
              size="large"
              color="dark"
              className="io-icon"
            ></IonIcon>
          </IonSegmentButton>
        </IonSegment>
        <IonRefresher
          slot="fixed"
          onIonRefresh={(event) =>
            this.changeSelectedChip(this.state.mac, event)
          }
        >
          <IonRefresherContent />
        </IonRefresher>
        <SlotGrid
          mac={this.state.mac}
          isShortPressed={(item) => this.onClickBtnFn(item.slotnumber)}
          isLongPressed={(item) => this.setState(() => ({ showPopover: item }))}
          slots={() => {}}
          addSlot={() => this.setState({ showSetupSlotModal: true })}
        />
{/* 
        <IonLoading
          isOpen={this.state.toggleAttemting}
          onDidDismiss={() => this.setState({ loading: false })}
          message={"Please wait..."}
        /> */}
        <IonPopover
          isOpen={this.state.showPopover === undefined ? false : true}
          onDidDismiss={() => this.setState(() => ({ showPopover: undefined }))}
        >
          <IonItem className="segment">
            <IonListHeader className="options-popover-title">
              {this.state.showPopover !== undefined
                ? this.state.showPopover.slotname
                : ""}{" "}
              options
            </IonListHeader>
          </IonItem>

          <IonItem onClick={() => this.addToGroup()}>
            <IonIcon
              icon={addCircle}
              size="large"
              className="io-icon"
              color="medium"
            ></IonIcon>
            <IonLabel>Add to Group</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon
              onClick={() => this.addSlot()}
              icon={pencilSharp}
              size="large"
              className="io-icon"
              color="medium"
            ></IonIcon>
            <IonLabel>Edit</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              onClick={() => this.deleteSlot()}
              icon={trash}
              size="large"
              className="io-icon"
              color="danger"
            ></IonIcon>
            <IonLabel>Delete</IonLabel>
          </IonItem>

          <IonItem onClick={() => this.setTimer(this.state.showPopover)}>
            <IonIcon
              icon={timerSharp}
              size="large"
              className="io-icon"
              color="medium"
            ></IonIcon>
            <IonLabel>Set Timer</IonLabel>
          </IonItem>

          <IonItem onClick={() => this.setSchedule(this.state.showPopover)}>
            <IonIcon
              icon={calendarSharp}
              size="medium"
              className="io-icon"
              color="medium"
            ></IonIcon>
            <IonLabel>Set Schedule</IonLabel>
          </IonItem>
        </IonPopover>

        <AddToGroupModal
          isOpen={this.state.showPickGroupModal}
          onDidDismiss={(show, msg) =>
            this.setState(() => ({
              showPickGroupModal: false,
              showPopover: undefined,
              showToast: show,
              toastMsg: msg,
            }))
          }
          mac={this.state.mac}
          slotnumber={
            this.state.showPopover === undefined
              ? 0
              : this.state.showPopover.slotnumber
          }
        />

        <IonActionSheet
          isOpen={this.state.showGroupActionSheet}
          mode="md"
          onDidDismiss={() =>
            this.setState(() => ({ showGroupActionSheet: false }))
          }
          buttons={[
            {
              text: "New group",
              role: "destructive",
              icon: addCircle,
              handler: () => {
                this.addToNewGroup();
              },
            },
            {
              text: "Add to existing group",
              role: "destructive",
              icon: bulb,
              handler: () => {
                this.setState(() => ({ showPickGroupModal: true }));
              },
            },
          ]}
        ></IonActionSheet>

        <IonModal
          containerStyle={test}
          isOpen={this.state.showSetupBuilderChipModal}
          onClose={this.close}
        >
          <SetupBuilderChipModalComponentHolder
            component={{
              ComponentType: 1,
              ComponentProperties: { roomid: this.state.roomid },
            }}
            onDidDismiss={(bool) =>
              this.setState({ showSetupBuilderChipModal: !bool })
            }
          />
        </IonModal>

        <IonModal containerStyle={test} isOpen={this.state.showSetupSlotModal}>
          <SetupSlotModalComponentHolder
            component={{
              ComponentType: 1,
              ComponentProperties: { mac: this.state.mac },
            }}
            onDidDismiss={() => this.setState({ showSetupSlotModal: false })}
          ></SetupSlotModalComponentHolder>
        </IonModal>

        <IonToast
          isOpen={this.state.showToast}
          onDidDismiss={() => {
            this.setState(() => ({ showToast: false }));
          }}
          message={this.state.toastMsg}
          duration={3000}
        />
      </IonContent>
    );
  }
}

export default withRouter(RoomComponent);

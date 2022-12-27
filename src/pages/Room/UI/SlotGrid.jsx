import React from "react";
import { withRouter } from "react-router";
import {
  IonGrid,
  IonRow,
  IonLabel,
  IonCol,
  IonIcon,
  IonButton,
  IonSkeletonText,
  IonContent,
} from "@ionic/react";

import {
  addOutline,
  addCircle,
  addCircleOutline,
  addSharp,
} from "ionicons/icons";
import { retrieveSlots } from "../../ServerRequests/globalApi";
import "../Slots.css";
import DisplayIconComponent from "../../MiscUiComponents/DisplayIconComponent";
import { chipState } from "../../ServerRequests/localApi";

var chip_state = "";
var auth_token = "";
var longPressed = false;

class SlotGrid extends React.Component {
  constructor(props) {
    super(props);

    auth_token = JSON.parse(localStorage.getItem("token"));

    this.state = {
      slotCount: 1,
      slotsItems: [],
      chip_state: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      loading: true,
    };

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.mac !== undefined) {
      setTimeout(() => {
        this.getSlotsInfo(props.mac);
      }, 1000);
    }

    console.log("recProp" + props.mac);
  }

  //Long Press----------------------------------------------------------------------------

  handleButtonPress(slot) {
    console.log("Pressed:" + slot.slotnumber);
    longPressed = false;
    this.buttonPressTimer = setTimeout(() => this.longPressed(slot), 500);
  }

  shortPressed(slot) {
    this.props.isShortPressed(slot);
  }
  longPressed(slot) {
    this.props.isLongPressed(slot);
    longPressed = true;
  }

  handleButtonRelease(slot) {
    if (!longPressed) {
      this.shortPressed(slot);
    }
    clearTimeout(this.buttonPressTimer);
  }

  //Long Press----------------------------------------------------------------------------

  updateChipState(chipstate) {
    if (chipstate != chip_state) {
      console.log("slotCount:" + this.state.slotCount);
      chip_state = parseInt(chipstate);
      var chip_state_num = chip_state.toString(2);
      var arr = chip_state_num.split("").map(Number);

      if (arr.length < this.state.slotCount) {
        var chip_state_num_arr = [];
        var difference = parseInt(this.state.slotCount) - parseInt(arr.length);

        for (var i = 0; i < difference; i++) {
          chip_state_num_arr[i] = 0;
        }
        for (var j = 0; j < arr.length; j++) {
          chip_state_num_arr[j + difference] = arr[j];
        }

        this.setState({ ...this.state, chip_state: chip_state_num_arr });
        console.log(this.state.chip_state);
      } else {
        chip_state_num = arr;
        this.setState({ ...this.state, chip_state: chip_state_num });
        console.log("chip_state:" + this.state.chip_state);
      }
    }
  }

  async getSlotsInfo(mac) {
    var data = JSON.stringify({ mac: mac });
    console.log("mac: " + mac);

    this.setState({ loading: true });
    this.getSlotsLocally(mac);

    const response = await retrieveSlots(data);

    if (response !== undefined) {
      console.log(response[0]);
      switch (response[0].status) {
        case 200:
          this.setState({
            slotsItems: response[0].data.slots,
            slotCount: response[0].data.slotcount,
            loading: false,
          });
          /*On success, setting the homeid in the local storage*/
          let obj = response[0].data.slotcount;
          localStorage.setItem("slotCount", JSON.stringify(obj));
          this.updateChipState(response[0].data.state);

          const resp = await chipState(response[0].data.ip);
          if (resp !== undefined) {
            switch (resp[0].status) {
              case 200:
                this.updateChipState(resp[0].data.state);
                break;

              default:
                break;
            }
          }
          console.log(response[0].data);
          break;

        default:
          console.log(
            "Could not connect to cloud. Using local slot data if available."
          );

          break;
      }
    } else {
      console.log(
        "Could not conect to cloud. Using local slot data if available."
      );
    }
  }

  async getSlotsLocally(mac) {
    var unparsedSlots = localStorage.getItem(mac);
    if (unparsedSlots !== null) {
      var chip = JSON.parse(unparsedSlots);
      this.setState({
        slotsItems: chip.slots,
        slotCount: chip.slotcount,
        loading: false,
      });
      /*On success, setting the homeid in the local storage*/
      // let obj = slots;
      // localStorage.setItem("slotCount", JSON.stringify(obj));
      // //this.updateChipState(slots);
      // console.log(slots);
    } else {
      this.setState({
        showToast: true,
        toastMsg: "Server Error.",
      });

      this.props.slots([]);
      return false;
    }

    return true;
  }

  render() {
    var btn = [];
    var grid;
    var slotArr = this.state.slotsItems;

    var content;

    if (this.state.loading) {
      for (var j = 0; j < 9; j++) {
        btn.push(
          <IonCol className="phome-col ion-align-self-center" size="4">
            <IonButton fill="clear" size="large" expand="block">
              <IonSkeletonText
                animated
                style={{ width: "70px", height: "70px" }}
              />
            </IonButton>

            <IonSkeletonText animated style={{ margin: "25%", width: "50%" }} />
          </IonCol>
        );
      }

      content = (
        <IonGrid>
          <IonRow>{btn}</IonRow>
        </IonGrid>
      );
    } else {
      for (var i = 1; i <= this.state.slotCount + 1; i++) {
        for (var j = 0; j < slotArr.length; j++) {
          var item = slotArr[j];

          if (i === item.slotnumber) {
            if (this.state.chip_state[i - 1] === 0) {
              btn.push(
                <IonCol className="phome-col ion-align-self-center" size="4">
                  <IonButton
                    className="glow-btn ion-no-padding"
                    shape="round"
                    size="large"
                    expand="block"
                    color="light-tint"
                    id={item.slotnumber} //id={item._id}
                    onTouchStart={this.handleButtonPress.bind(this, item)}
                    onTouchEnd={this.handleButtonRelease.bind(this, item)}
                  >
                    <DisplayIconComponent
                      icon={item.sloticon}
                    ></DisplayIconComponent>
                  </IonButton>
                  <br />
                  <IonLabel className="slot-label">{item.slotname}</IonLabel>
                </IonCol>
              );
            } else {
              btn.push(
                <IonCol className="phome-col ion-align-self-center" size="4">
                  <IonButton
                    className="no-glow-btn ion-no-padding"
                    shape="round"
                    size="large"
                    color="light-tint"
                    expand="block"
                    id={item.slotnumber} //id={item._id}
                    onTouchStart={this.handleButtonPress.bind(this, item)}
                    onTouchEnd={this.handleButtonRelease.bind(this, item)}
                  >
                    <DisplayIconComponent
                      icon={item.sloticon}
                    ></DisplayIconComponent>
                  </IonButton>
                  <br />
                  <IonLabel className="slot-label">{item.slotname}</IonLabel>
                </IonCol>
              );
            }
          }
        }
      }

      grid = (
        <IonGrid>
          <IonRow>
            {btn}

            <IonCol className="phome-col ion-align-self-center" size="4">
              <IonButton
                fill="solid"
                className="slot-add-btn ion-no-padding"
                shape="round"
                size="large"
                color="dark"
                onClick={() => this.props.addSlot()}
              >
                <IonIcon icon={addOutline} className="addBtnIcon"></IonIcon>
              </IonButton>
              <br />
              <IonLabel className="slot-label">Add/Edit Device</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      );

      if (this.state.slotCount === 0 || this.state.slotCount === undefined) {
        content = (
          <div>
            <IonButton
              className="add-new-slot-btn ion-no-padding"
              fill="clear"
              shape="round"
              size="large"
              expand="block"
              color="light"
              onClick={() => this.props.addSlot()}
            >
              <IonIcon
                color="white"
                fill="white"
                style={{ fontSize: "150px" }}
                icon={addCircle}
              />
            </IonButton>
            <br />
            <p className="add-slot-label">ADD A DEVICE</p>
            <br />
          </div>
        );
      } else {
        content = grid;
      }
    }
    return <IonContent className="slot-grid">{content}</IonContent>;
  }
}
export default withRouter(SlotGrid);

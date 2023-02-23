import { Socket } from "net";
import { HOST } from "./globalApi";
import io from "socket.io-client";
import WebSocket from "ws";
const socket = io();
export const SETUP_IP = "http://192.168.4.1";

//Chip Info============================================================================
export const GETCHIPMACSETUP = SETUP_IP + "/mac";
export const GETCHIPINFO = SETUP_IP + "/about-chip";

//Chip Setup============================================================================
export const CHANGECHIPSSIDSETUP =
  SETUP_IP + "/chip-interface?serial_input=wifi~change-ssid|";
export const CHANGECHIPPASSWORDSETUP =
  SETUP_IP + "/chip-interface?serial_input=wifi~change-password|";

export const CHANGECHIPAPIHOSTSETUP =
  SETUP_IP + "/chip-interface?serial_input=api~change-host|";
export const CHANGECHIPAPIUSERNAMESETUP =
  SETUP_IP +
  "/chip-interface?serial_input=api~change-username|sc_firmware_ver_1.0|0";
export const CHANGECHIPAPIPASSWORDSETUP =
  SETUP_IP +
  "/chip-interface?serial_input=api~change-password|QguAuy5OzrL-&qe|0";

export const CHANGECHIPWSHOSTSETUP =
  SETUP_IP + "/chip-interface?serial_input=ws~change-ws-host|";

export const RESETCHIPWIFISETUP =
  SETUP_IP + "/chip-interface?serial_input=wifi~reset| |0";
//Chip Setup============================================================================

//Chip IO============================================================================
export const TOGGLESLOT = "/chip-interface?serial_input=io~toggle| |";
export const ONSLOT = "/chip-interface?serial_input=io~on| |";
export const OFFSLOT = "/chip-interface?serial_input=io~off| |";
export const STARTTIMER = "/chip-interface?serial_input=timer~start| |";

export const GETECHIPSTATE = "/state";

export const GETTIMERS = "/timers";
export const GETSCHEDULES = "/schedules";

export const SETTIMER = "/chip-interface?serial_input=timer~set|";
export const SETSCHEDULE = "/chip-interface?serial_input=scheduler~set|";

export const DELETETIMER = "/chip-interface?serial_input=timer~delete| |";
export const DELETESCHEDULE =
  "/chip-interface?serial_input=scheduler~delete| |";
//Chip IO============================================================================

//Chip Info============================================================================
export const getChipMACSetup = async () => {
  var err = false;
  const result = await fetch(GETCHIPMACSETUP, { method: "GET" }).catch(
    function (error) {
      err = true;
      const statusCode = 404;
      const data = error;
      return Promise.all([{ status: statusCode, data: data }]);
    }
  );

  if (!err) {
    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{ status: statusCode, data: data }]);
  }
};

export const getChipInfo = async () => {
  var err = false;
  const result = await fetch(GETCHIPINFO, { method: "GET" }).catch(function (
    error
  ) {
    err = true;
    const statusCode = 404;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{ status: statusCode, data: data }]);
  }
};

export const getChipMac = async (IP) => {
  const timeout = 2000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  var err = false;
  const response = await fetch("http://" + IP + "/mac", {
    method: "GET",
    signal: controller.signal,
  }).catch(function (error) {
    err = true;
    const statusCode = 404;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = response.status;
    const data = await response.json();
    return Promise.all([{ status: statusCode, data: data }]);
  }

  clearTimeout(id);
};
//Chip Info============================================================================

//Chip Setup============================================================================
export const changeChipSSID = async (ssid) => {
  const result = await fetch(CHANGECHIPSSIDSETUP + ssid + "|0", {
    method: "GET",
  });

  const statusCode = result.status;
  const data = result;
  return Promise.all([{ status: statusCode, data: data }]);
};

export const changeChipPassword = async (password) => {
  const result = await fetch(CHANGECHIPPASSWORDSETUP + password + "|0", {
    method: "GET",
  });

  const statusCode = result.status;
  const data = result;
  return Promise.all([{ status: statusCode, data: data }]);
};

//----------------------------------------------------------------------------------------

export const changeChipAPIHost = async () => {
  const result = await fetch(CHANGECHIPAPIHOSTSETUP + HOST + "|0", {
    method: "GET",
  });

  const statusCode = result.status;
  const data = result;
  return Promise.all([{ status: statusCode, data: data }]);
};

export const changeChipAPIUsername = async () => {
  const result = await fetch(CHANGECHIPAPIUSERNAMESETUP, { method: "GET" });

  const statusCode = result.status;
  const data = result;
  return Promise.all([{ status: statusCode, data: data }]);
};

export const changeChipAPIPassword = async (password) => {
  const result = await fetch(CHANGECHIPAPIPASSWORDSETUP, { method: "GET" });

  const statusCode = result.status;
  const data = result;
  return Promise.all([{ status: statusCode, data: data }]);
};

//----------------------------------------------------------------------------------------

export const resetChipWifi = async () => {
  const result = await fetch(CHANGECHIPPASSWORDSETUP, { method: "GET" });

  const statusCode = 200;
  const data = result;
  return Promise.all([{ status: statusCode, data: data }]);
};

//Chip Setup============================================================================

//Chip IO============================================================================
export const toggleSlot = async (ip, slotnumber) => {
  var err = false;
  const result = await fetch("http://" + ip + TOGGLESLOT + slotnumber, {
    method: "GET",
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;
    socket.emit("toggle", {mac: ip, slot: slotnumber });
    return Promise.all([{ status: statusCode, data: data }]);
  }
};

export const onSlot = async (ip, slotnumber) => {
  var err = false;
  const result = await fetch("http://" + ip + ONSLOT + slotnumber, {
    method: "GET",
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;
    return Promise.all([{ status: statusCode, data: data }]);
  }
};

export const offSlot = async (ip, slotnumber) => {
  var err = false;
  const result = await fetch("http://" + ip + OFFSLOT + slotnumber, {
    method: "GET",
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;
    return Promise.all([{ status: statusCode, data: data }]);
  }
};

export const startTimer = async (ip, slotnumber) => {
  var err = false;
  const result = await fetch("http://" + ip + STARTTIMER + slotnumber, {
    method: "GET",
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;
    return Promise.all([{ status: statusCode, data: data }]);
  }
};

export const chipState = async (ip) => {
  var err = false;
  const result = await fetch("http://" + ip + GETECHIPSTATE, {
    method: "GET",
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{ status: statusCode, data: data }]);
  }
};

export const getTimers = async (ip) => {
  const timeout = 6000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  var err = false;
  const result = await fetch("http://" + ip + GETTIMERS, {
    method: "GET",
    signal: controller.signal,
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{ status: statusCode, data: data }]);
  }

  clearTimeout(id);
};

export const getSchedules = async (ip) => {
  const timeout = 6000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  var err = false;
  const result = await fetch("http://" + ip + GETSCHEDULES, {
    method: "GET",
    signal: controller.signal,
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{ status: statusCode, data: data }]);
  }
  clearTimeout(id);
};

export const setTimer = async (ip, duration, slot, mac) => {
  const timeout = 6000;
  console.log(SETUP_IP, duration, slot, mac);
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  var err = false;

  const result = await fetch(
    "http://" + ip + SETTIMER + duration + "|" + slot,
    { method: "GET", signal: controller.signal }
  ).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;
    const socketRef = io("ws://clickademy.in/");
    socketRef.emit("timer-set", {
      mac: mac,
      slotnumber: slot,
      duration: duration,
    });
    return Promise.all([{ status: statusCode, data: data }]);
  }

  clearTimeout(id);
};

export const setSchedule = async (ip, schedule, slot) => {
  const timeout = 6000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  var err = false;
  const result = await fetch(
    "http://" + ip + SETSCHEDULE + schedule + "|" + slot,
    { method: "GET", signal: controller.signal }
  ).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    socket.emit("schedule-set", {
      mac: ip,
      slotnumber: slot,
      schedule: schedule,
    });
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;
    return Promise.all([{ status: statusCode, data: data }]);
  }

  clearTimeout(id);
};

export const deleteTimer = async (ip, slot) => {
  const timeout = 6000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  var err = false;
  const result = await fetch("http://" + ip + DELETETIMER + slot, {
    method: "GET",
    signal: controller.signal,
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;
    return Promise.all([{ status: statusCode, data: data }]);
  }

  clearTimeout(id);
};

export const deleteSchedule = async (ip, slot,schedule) => {
  const timeout = 6000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  var err = false;
  const result = await fetch("http://" + ip + DELETESCHEDULE + slot, {
    method: "GET",
    signal: controller.signal,
  }).catch(function (error) {
    err = true;
    const statusCode = 500;
    const data = error;
    return Promise.all([{ status: statusCode, data: data }]);
  });

  if (!err) {
    const statusCode = result.status;
    const data = await result;

    socket.emit("schedule-delete", {
      mac: ip,
      slotnumber: slot,
      schedule: schedule,
    });
    return Promise.all([{ status: statusCode, data: data }]);
  }

  clearTimeout(id);
};

//Chip IO============================================================================

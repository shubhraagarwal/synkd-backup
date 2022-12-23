export const HOST = "https://clickademy.in";
export const SOCKETIOLIB = HOST+"/socket.io/socket.io.js";
export const SOCKETIOHOST = "http://clickademy.in";


//Home-------------------------------------------------------------------------
export const RETRIEVEROOMSENDPOINT = HOST + "/home/retrieve-rooms";
//Home-------------------------------------------------------------------------

//Rooms-------------------------------------------------------------------------
export const CREATEROOMENDPOINT = HOST + "/room/create";
//Rooms-------------------------------------------------------------------------



//Groups-------------------------------------------------------------------------
export const CREATEGROUPENDPOINT = HOST + "/group/create"
export const RETRIEVEGROUPSENDPOINT = HOST+"/home/retrieve-groups";
export const ADDTOGROUPENDPOINT = HOST+"/group/add-slot";
export const RETRIEVESLOTSFROMGROUPENDPOINT = HOST+"/group/retrieve-slots";
export const DELETEGROUP = HOST + "/group/delete";
//Groups-------------------------------------------------------------------------

//Slots-------------------------------------------------------------------------
export const RETRIEVESLOTSENDPOINT = HOST + "/switchcontrollers/retrieve-slots";
export const SETSLOT = HOST + "/switchcontrollers/set-slot";
export const REMOVESLOTFROMGROUPENDPOINT = HOST + "/group/remove-slot";   
//Slots-------------------------------------------------------------------------


//Switchcontrollers-------------------------------------------------------------
export const RETRIEVESWITCHCONTROLLERSENDPOINT = HOST + "/room/retrieve-switchcontrollers";
export const CREATESWITCHCONTROLLERENDPOINT = HOST + "/switchcontrollers/create";
export const GETSWITCHCONTROLLERIP = HOST + "/switchcontrollers/get-ip";
//Switchcontrollers-------------------------------------------------------------




var auth_token = JSON.parse(localStorage.getItem("token"));





//Home-------------------------------------------------------------------------
export const retrieveRooms = async(body) =>{


    const result = await fetch(RETRIEVEROOMSENDPOINT,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 
    
    
    });


    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{status: statusCode, data: data}]);


}

//Home-------------------------------------------------------------------------






//Room-------------------------------------------------------------------------

export const createRoom = async(body) =>{


    const result = await fetch(CREATEROOMENDPOINT,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 
    
    
    });


    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{status: statusCode, data: data}]);


}
//Room-------------------------------------------------------------------------







//Groups-------------------------------------------------------------------------


export const createGroup = async(body) =>{
   
    const result = await fetch(CREATEGROUPENDPOINT,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 


    });

    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{status: statusCode, data: data}]);

  


} 







//data -> homeid
export const retrieveGroups = async(body) =>{
   
        const result = await fetch(RETRIEVEGROUPSENDPOINT,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth_token,
            },
            body: body 
 
 
        });

        const statusCode = result.status;
        const data = await result.json();
        return Promise.all([{status: statusCode, data: data}]);
  
      

    
} 

export const retrieveSlotsFromGroup = async(body) =>{

    const result = await fetch(RETRIEVESLOTSFROMGROUPENDPOINT,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body
    });


    const statusCode = result.status;
    const data = await result.json();

    return Promise.all([{status: statusCode, data: data}]);

}



export const addToGroup = async(body) =>{
   
    const result = await fetch(ADDTOGROUPENDPOINT,{

        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 


    });

    const statusCode = result.status;
    const data = await result.json();
    console.log(data);
    return Promise.all([{status: statusCode, data: data}]);
  


} 

export const removeSlotFromGroup = async(body) =>{
    
    const result = await fetch(REMOVESLOTFROMGROUPENDPOINT,{

        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 


    });

    const statusCode = result.status;
    const data = await result.json();
    console.log(data);
    return Promise.all([{status: statusCode, data: data}]);
  

}

export const deleteGroup = async(body) =>{
   
    const result = await fetch(DELETEGROUP,{

        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 


    });

    const statusCode = result.status;
    const data = await result.json();
    console.log(data);
    return Promise.all([{status: statusCode, data: data}]);
  


} 

//Groups-------------------------------------------------------------------------










//Slots-------------------------------------------------------------------------



export const retrieveSlots = async(body) =>{
   
    const timeout = 6000; 
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    var err = false;
    const response = await fetch(RETRIEVESLOTSENDPOINT,{

        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token
        },
        signal: controller.signal,
        body: body 


    }).catch(function(error){
        err = true;
        const statusCode = 404;
        const data = error;
        return Promise.all([{status: statusCode, data: data}]);
    });


    if(!err){
        const statusCode = response.status;
        const data = await response.json();
        return Promise.all([{status: statusCode, data: data}]);
    }    

      clearTimeout(id);

  


}




export const setSlot = async(body) =>{
   
    const result = await fetch(SETSLOT,{

        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 


    });

    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{status: statusCode, data: data}]);

  


}


//Slots-------------------------------------------------------------------------



//Switchcontrollers-------------------------------------------------------------

export const retrieveSwitchControllers = async(body) =>{

    const result = await fetch(RETRIEVESWITCHCONTROLLERSENDPOINT,{

        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
        },
        body: body 


    });

    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{status: statusCode, data: data}]);

}



export const createSwitchController = async(body) =>{

    const result = await fetch(CREATESWITCHCONTROLLERENDPOINT,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth_token
        },
        body: body
    });

    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{status: statusCode, data: data}]);
}



export const getSwitchControllerIP = async(body) =>{

    const result = await fetch(GETSWITCHCONTROLLERIP,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth_token
        },
        body: body
    });

    const statusCode = result.status;
    const data = await result.json();
    return Promise.all([{status: statusCode, data: data}]);
}

//Switchcontrollers-------------------------------------------------------------

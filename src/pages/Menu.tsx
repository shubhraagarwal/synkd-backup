import React from "react";
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import img1 from "../images/limg3.png";
import './Menu.css';
import {useLocation} from 'react-router-dom';
import { helpCircleSharp, homeOutline, homeSharp, logOutOutline, peopleSharp, personCircleOutline, phonePortraitSharp, settingsOutline } from "ionicons/icons";
import Logout from "./Logout"
import { Plugins } from "@capacitor/core";
import "@codetrix-studio/capacitor-google-auth";



interface AppPage {
  url : string;
  title : string;
}




const Menu : React.FC = () => 
{
 const location = useLocation();

 const logout = () => {
  var sapp = localStorage.getItem("SocialApp")
  if (sapp === "Facebook") {
    Plugins.FacebookLogin.logout();
    window.localStorage.clear();
    window.location.href = "/CheckUser";
  } else if (sapp === "Google") {
    Plugins.GoogleAuth.signOut();
    window.localStorage.clear();
    window.location.href = "/CheckUser";
  } else {
    window.localStorage.clear();
    window.location.href = "/CheckUser";
  }
 }; 
 
 const namefn = () =>{

  var name = localStorage.getItem('firstname');
  var fname = name !== null ? JSON.parse(name) : "";

  return fname;
 }

const profileSettings = () =>{
 console.log('Clicked Profile Settings');
 window.location.href = "/MainPage?sidemenu=PROFILE_SETTINGS";
}

const checkLocation = () =>{
  console.log(window.location.pathname);
  switch(window.location.pathname){
    case "/MainPage":
       return false;

    default:
    return true;
      
  }
}
 
  return (
      <IonMenu
        menuId="first"
        contentId="menuContent"
        swipe-gesture="false"
        type="overlay"
        disabled={checkLocation()}
        >
        <IonContent>
         
          <IonList className="ion_list">
            <img  alt="imagelogo" className="mx-auto rounded-circle Synkd_Logo" src={img1}></img>
            <h6 className="Name">{namefn()}</h6>
            <IonItem
              lines="none"
              onClick={() => {profileSettings()}}
            >Change Password</IonItem>
            <IonItem
             onClick={() => {logout()}}>Log Out</IonItem>
            </IonList>
            
            
            {/* {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                 <IonItem
                                    className={location.pathname === appPage.url
                                    ? 'selected'
                                    : ''}
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                    id="ionchanges"
                                    >
                                    <IonIcon slot="start" />
                                    <IonLabel className="MenuInfo">{appPage.title}</IonLabel>
                                </IonItem> 

                                
                                
                            </IonMenuToggle>
                        );
                      })} 
                      <IonItem>
                    <IonLabel className="components" onClick= {() => logout()}>Logout</IonLabel> 
                </IonItem>*/}
          </IonContent>
      </IonMenu>


  );
                    };
export default Menu;
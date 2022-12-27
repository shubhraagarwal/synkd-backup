import React from 'react';
import {IonPage, IonContent, IonIcon, IonButtons, IonMenuButton, IonInput, IonItem, IonTitle,IonToolbar,IonFooter,IonButton, IonHeader} from '@ionic/react';


class SideMenuPage extends React.Component{

  render(){
      return (
        <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
        <IonMenuButton menu="first"></IonMenuButton>
        </IonButtons>
        
        <IonTitle style ={{ paddingLeft : '6rem',}} slot="start">MY HOME</IonTitle>
        </IonToolbar>
        </IonHeader>
      )
  }
}

export default SideMenuPage;

import React from 'react';
import img1 from "../images/limg3.png";
import {IonPage, IonContent, IonList} from '@ionic/react';

class AddUser extends React.Component{


    render(){
        return (
            <IonPage>
          <IonContent>
            <IonList className="ion_list">
            <img  alt="imagelogo" className="mx-auto rounded-circle Synkd_Logo" src={img1}></img>
            <h1>Add User </h1>
            </IonList>
            </IonContent>
            </IonPage>
        )
    }
}

export default AddUser;
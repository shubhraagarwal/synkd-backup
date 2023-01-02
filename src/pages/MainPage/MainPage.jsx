import React from "react";
import {
    IonPage,
    IonModal,
    IonToast

} from "@ionic/react"

import DisplayComponent from "./DisplayComponent";
import BottomNavBar from "./BottomNavBar";
import SideMenuOptionsComponentHolder from "../MiscUiComponents/SideMenuOptionsComponentHolder";


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        var sidemenu = urlParams.get('sidemenu');
        console.log(sidemenu);

        var dComponent = {ComponentType: "HOME"};
        var cProps = [];

        if(this.props.location !== undefined)
        {   
            if(this.props.location.state !== undefined)
            {
                dComponent = this.props.location.state.DisplayComponent;
                cProps = this.props.location.state.ComponentProperties; 
            }
        }

        this.state={ 
            DisplayComponent: dComponent,
            showSideMenuOptionsModal: sidemenu !== null?true:false,
            sideMenuOption: sidemenu

        }
    }

   
  

    

    render(){
        return( 
        <IonPage>

          

            <DisplayComponent
                component={this.state.DisplayComponent}
                selectedComponent={(comp) => this.setState({DisplayComponent: comp}) }
            />

                <IonModal
                isOpen={this.state.showSideMenuOptionsModal}>
                  <SideMenuOptionsComponentHolder
                  component={{ComponentType: this.state.sideMenuOption}}
                  onDidDismiss={() => {this.setState({showSideMenuOptionsModal: false});}}
                  />
                </IonModal>

            <BottomNavBar
            value={this.state.DisplayComponent}
            selected={(option) => this.setState({DisplayComponent: option})}
             />

           

        </IonPage>
        )
    }
}
export default MainPage;
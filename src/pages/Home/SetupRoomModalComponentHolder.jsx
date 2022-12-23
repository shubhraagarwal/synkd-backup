import React from "react";
import IconPicker from "../MiscUiComponents/IconPicker";
import NameRoom from "./NameRoom";



class SetupRoomModalComponentHolder extends React.Component{

    constructor(props){
        super(props);
        if(this.props !== undefined)
        {

        this.state = {
            ComponentType: this.props.component.ComponentType,
            onDidDismiss: false,
            icon: undefined,
            ComponentProperties: this.props.component.ComponentProperties, 
            lastComponent: 0
        }
    }
    }




    render(){

        
        switch(this.state.ComponentType){
            case 2:
                return(<NameRoom
                        icon={this.state.icon}
                        properties={this.state.ComponentProperties}
                        component={(comp) => 
                            this.setState({ComponentType: comp.ComponentType,
                                           lastComponent: 2,
                                           ComponentProperties: comp.ComponentProperties})}
                        onDidDismiss={() => this.props.onDidDismiss()} />);
                      


            case 1:
                return(<IconPicker 
                        properties={this.state.ComponentProperties}
                        component={(comp) => 
                        this.setState({ ComponentType: comp.ComponentType, 
                                        ComponentProperties: comp.ComponentProperties,
                                        icon: comp.icon, lastComponent: 1})}
                        onDidDismiss={(props) => 
                            this.state.lastComponent===0?this.props.onDidDismiss():
                            this.setState({ComponentType: this.state.lastComponent,
                                           ComponentProperties: props}) }
                        />);

          
        }
    }
}

export default SetupRoomModalComponentHolder;
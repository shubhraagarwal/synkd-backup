import React from "react";
import ProfileSettings from "./ProfileSettings";

class SideMenuOptionsComponentHolder extends React.Component{

    constructor(props){
        super(props);
        if(this.props !== undefined)
        {

        this.state = {
            ComponentType: this.props.component.ComponentType,
            ComponentProperties: this.props.component.ComponentProperties,
            onDidDissmiss: false
        }
    }
    }


    render(){
        switch(this.state.ComponentType){
            case "PROFILE_SETTINGS":
                return(<ProfileSettings
                        onDidDismiss={(bool) => this.props.onDidDismiss(bool)}
                        />);
            default:
                return(<div></div>);
        }

    }
}

export default SideMenuOptionsComponentHolder;
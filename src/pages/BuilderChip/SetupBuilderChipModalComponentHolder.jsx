
import React from "react";
import BuilderChipSetupStart from "./BuilderChipSetupStart";
import BuilderChipSetupWifi from "./BuilderChipSetupWifi";
import BuilderChipSetupName from "./BuilderChipSetupName";

class SetupBuilderChipModalComponentHolder extends React.Component{
    constructor(props){
        super(props);
        if(this.props !== undefined)
        {

        this.state = {
            ComponentType: this.props.component.ComponentType,
            mac: "",
            roomid: this.props.component.ComponentProperties.roomid,
            onDidDismiss: false,
            slotCount: 4
        }
    }
    }

  
    
    render(){
        


        switch(this.state.ComponentType){


            case 2:
                return(<BuilderChipSetupWifi
                    mac={this.state.mac} 
                    roomid={this.state.roomid}
                    onDidDismiss={(bool) => this.props.onDidDismiss(bool)}
                    component={(comp) => this.setState({ComponentType: comp.ComponentType, mac: comp.mac, roomid: comp.roomid})}/>);

                

            case 3:
                return(<BuilderChipSetupName 
                    mac={this.state.mac} 
                    roomid={this.state.roomid}
                    slotCount={this.state.slotCount}
                    onDidDismiss={(bool) => this.props.onDidDismiss(bool)}/>);
                

                default:
                    return(<BuilderChipSetupStart 
                    roomid={this.state.roomid}
                    onDidDismiss={(bool) => this.props.onDidDismiss(bool)}
                    component={(comp) => this.setState({ComponentType: comp.ComponentType, mac: comp.mac, roomid: comp.roomid, slotCount: comp.slotCount})}/>);
                    
           
        }

    }

}

export default SetupBuilderChipModalComponentHolder;
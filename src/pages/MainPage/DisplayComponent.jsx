import React from "react";
import AutomationPage from "../Automation/AutomationPage";
import GroupsPage from "../Groups/GroupsPage";
import PHomepage from "../Home/PHomePage";
import RoomComponent from "../Room/RoomComponent";


class DisplayComponent extends React.Component{


 
    render(){
        let componentType = this.props.component.ComponentType;
        let properties = this.props.component.ComponentProperties;
        
        if(properties !== undefined){
            if(properties.subcomponent !== undefined)
            {componentType = properties.subcomponent;}
        }


        switch(componentType){

            case "HOME":
                return(<PHomepage
                        component={(comp) => {this.props.selectedComponent(comp)}}
                        properties
                        ={properties!==undefined?properties:undefined}
                        />);
                
                        
            case "GROUPS":
                return(<GroupsPage
                        component={(comp) => {this.props.selectedComponent(comp)}}
                        properties
                        ={properties!==undefined?properties:undefined}
                        />);

            case "AUTOMATION":
                return(<AutomationPage
                        component={(comp) => {this.props.selectedComponent(comp)}}
                        properties
                        ={properties!==undefined?properties:undefined}
                        />);

            case "ROOM":
                return(<RoomComponent
                        component={(comp) => {this.props.selectedComponent(comp)}}
                        properties
                        ={properties!==undefined?properties:undefined}
                        />);
               
            
            default:
                return(<PHomepage />)
               
        }

    }
}
export default DisplayComponent;
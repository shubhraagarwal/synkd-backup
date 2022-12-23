import React from "react";

import {
    
    IonButton
    
  } from "@ionic/react";
import { withRouter  } from "react-router-dom";

//var inheritedRepeat = [true,true,true,true,true,true,true];


class RepeatDisplay extends React.Component {

    constructor(props){
        super(props);
        
          
        

    }

  


    

    render(){

      let inheritedRepeat = this.props.repeat;
      let repeat = [];

    for(var i=0; i<inheritedRepeat.length; i++){
    
        switch(i){
          case 0:
            
              if(inheritedRepeat[i+1]){
                repeat.push( <IonButton
                  className="day-btn"
                  color="primary"
                  >
                    M</IonButton>
                );
    
              }else{
                repeat.push( <IonButton
                  className="day-btn"
                  color="light">
                    M</IonButton>
                );
    
              }
            
            break;
    
          case 1:
    
          
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                color="primary"
                >
                  T</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                color="light"
               >
                  T</IonButton>
              );
    
            }
          break;
    
          case 2:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                color="primary"
                >
                  W</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                color="light"
                >
                  W</IonButton>
              );
    
            }
          break;
    
          case 3:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                color="primary"
                >
                  T</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                color="light"
                >
                  T</IonButton>
              );
    
            }
          break;
    
          case 4:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                color="primary"
                >
                  F</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                color="light"
                >
                  F</IonButton>
              );
    
            }
          break;
    
          case 5:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                color="primary"
                >
                  S</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                color="medium"
                >
                  S</IonButton>
              );
    
            }
          break;
    
          case 6:
            if(inheritedRepeat[0]){
              repeat.push( <IonButton
                className="day-btn"
                color="primary"
                >
                  S</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                color="dark"
               >
                  S</IonButton>
              );
    
            }
          break;
    
    
        }
       
    
        
    
      }
    
      return(repeat);
    }
}

export default withRouter(RepeatDisplay);


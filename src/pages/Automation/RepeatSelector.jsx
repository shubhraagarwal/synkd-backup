import React from "react";

import {
    
    IonButton
    
  } from "@ionic/react";
import { withRouter  } from "react-router-dom";

var inheritedRepeat = [true,true,true,true,true,true,true];


class RepeatSelector extends React.Component {

    constructor(props){
        super(props);
        inheritedRepeat = props.repeat;

    }


    repeatSelector(clickedBtn){
        var repeat = inheritedRepeat;
        repeat[clickedBtn] = !repeat[clickedBtn];
        this.setState({repeat: repeat});
     }

    render(){

    let repeat = [];
    for(var i=0; i<inheritedRepeat.length; i++){
    
        switch(i){
          case 0:
            
              if(inheritedRepeat[i+1]){
                repeat.push( <IonButton
                  className="day-btn"
                  expand="block"
                  shape="round"
                  color="primary"
                  onClick={this.repeatSelector.bind(this,1)}>
                    M</IonButton>
                );
    
              }else{
                repeat.push( <IonButton
                  className="day-btn"
                  expand="block"
                  shape="round"
                  color="light"
                  onClick={this.repeatSelector.bind(this,1)}>
                    M</IonButton>
                );
    
              }
            
            break;
    
          case 1:
    
          
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="primary"
                onClick={this.repeatSelector.bind(this, 2)}>
                  T</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="light"
                onClick={this.repeatSelector.bind(this,2)}>
                  T</IonButton>
              );
    
            }
          break;
    
          case 2:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="primary"
                onClick={this.repeatSelector.bind(this, 3)}>
                  W</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="light"
                onClick={this.repeatSelector.bind(this,3)}>
                  W</IonButton>
              );
    
            }
          break;
    
          case 3:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="primary"
                onClick={this.repeatSelector.bind(this,4)}>
                  T</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="light"
                onClick={this.repeatSelector.bind(this,4)}>
                  T</IonButton>
              );
    
            }
          break;
    
          case 4:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="primary"
                onClick={this.repeatSelector.bind(this,5)}>
                  F</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="light"
                onClick={this.repeatSelector.bind(this,5)}>
                  F</IonButton>
              );
    
            }
          break;
    
          case 5:
            
            if(inheritedRepeat[i+1]){
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="primary"
                onClick={this.repeatSelector.bind(this,6)}>
                  S</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="dark"
                onClick={this.repeatSelector.bind(this,6)}>
                  S</IonButton>
              );
    
            }
          break;
    
          case 6:
            if(inheritedRepeat[0]){
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="primary"
                onClick={this.repeatSelector.bind(this,0)}>
                  S</IonButton>
              );
    
            }else{
              repeat.push( <IonButton
                className="day-btn"
                expand="block"
                shape="round"
                color="dark"
                onClick={this.repeatSelector.bind(this,0)}>
                  S</IonButton>
              );
    
            }
          break;
    
    
        }
       
    
        
    
      }
    
      return(repeat);
    }
}

export default withRouter(RepeatSelector);


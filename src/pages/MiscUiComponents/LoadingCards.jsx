import React from "react";

import { IonSkeletonText, IonThumbnail } from "@ionic/react";
import { withRouter  } from "react-router-dom";

class LoadingCards extends React.Component {
  constructor(props) {
      super(props);
  }

  render(){

    return(
          <div style={{width:"100%", height:"100%" }}>
          <IonThumbnail className="ion-padding custom-skeleton" slot="start" style={{ width: '100%' , height: "30%" }}>
              <IonSkeletonText animated  />
          </IonThumbnail>
          <IonThumbnail className="ion-padding custom-skeleton" slot="start" style={{ width: '100%' , height: "30%" }}>
              <IonSkeletonText animated  />
          </IonThumbnail>
          <IonThumbnail className="ion-padding custom-skeleton" slot="start" style={{ width: '100%' , height: "30%" }}>
              <IonSkeletonText animated  />
          </IonThumbnail>
          <IonThumbnail className="ion-padding custom-skeleton" slot="start" style={{ width: '100%' , height: "30%" }}>
              <IonSkeletonText animated  />
          </IonThumbnail>
      </div>
    )
  }
  }
  export default withRouter(LoadingCards);
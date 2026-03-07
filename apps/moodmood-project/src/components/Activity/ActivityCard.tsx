import {
  IonIcon
} from "@ionic/react";

import {
  bedOutline,
  walkOutline,
  waterOutline,
  fitnessOutline
} from "ionicons/icons";

interface Props{
  icon:string
  label:string
  time:string
}

const icons:any = {
  bed:bedOutline,
  run:walkOutline,
  water:waterOutline,
  meditate:fitnessOutline
}

const ActivityCard:React.FC<Props> = ({icon,label,time}) => {

  return(

    <div className="activity-card">

      <div className="activity-icon">
        <IonIcon icon={icons[icon]} />
      </div>

      <div className="activity-label">
        {label}
      </div>

      <div className="activity-time">
        {time}
      </div>

    </div>

  )

}

export default ActivityCard
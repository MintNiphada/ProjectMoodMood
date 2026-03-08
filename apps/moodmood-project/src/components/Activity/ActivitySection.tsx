import ActivityCard from "./ActivityCard";

interface Props{
  date:string
}

const ActivitySection:React.FC<Props> = ({date}) => {

  return(
    <div className="activity-section">

      <div className="activity-date">
        {date}
      </div>

      <ActivityCard icon="bed" label="นอน" time="8 ชั่วโมง"/>
      <ActivityCard icon="run" label="ออกกำลังกาย" time="30 นาที"/>
      <ActivityCard icon="water" label="ดื่มน้ำ" time="8 แก้ว"/>

    </div>
  )

}

export default ActivitySection
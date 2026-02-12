import { Box } from "@mui/material"
import ActivityCard from "./ActivityCard"


type Props = {
    activities: Activity[] // property name 'activities' of type array of Activity objects: type of data we expect to receive from parent component
}

export default function ActivityList({activities}: Props) {
  return (
   <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
    {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity}/>
))}
   
   </Box>
  )
}
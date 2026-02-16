import { Grid2 } from "@mui/material";

import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";


//DEFINING PROPS WHICH OUR COMPONENT EXPECTS TO RECEIVE FROM ITS PARENT COMPONENT (APP.tsx)
type Props = {
    activities: Activity[] // property name 'activities' of type array of Activity objects: type of data we expect to receive from parent component
}

export default function ActivityDashboard({activities}: Props) {
  return (
<Grid2 container spacing={3}>
    <Grid2 size={9}>
        
 <ActivityList activities={activities}/>

    </Grid2>

    <Grid2 size={3}>
        {activities[0] && <ActivityDetails  activity={activities[0]}/>}
    </Grid2>

</Grid2>
  )
}
import { Grid2 } from "@mui/material";

import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";


//DEFINING PROPS WHICH OUR COMPONENT EXPECTS TO RECEIVE FROM ITS PARENT COMPONENT (APP.tsx)
type Props = {
    activities: Activity[] // property name 'activities' of type array of Activity objects: type of data we expect to receive from parent component
    selectActivity: (id: string) => void ;// property name 'selectActivity' of type function that takes a string argument and returns void: type of data we expect to receive from parent component
    cancelSelectActivity: () => void; // property name 'cancelSelectActivity' of type function that takes no arguments and returns void: type of data we expect to receive from parent component
    selectedActivity? : Activity; // property name 'selectedActivity' of type Activity object or undefined: type of data we expect to receive from parent component
}
  

export default function ActivityDashboard({activities,selectActivity, selectedActivity, 
  cancelSelectActivity}: Props) {
  return (
<Grid2 container spacing={3}>
    <Grid2 size={9}>
        
 <ActivityList 
 activities={activities}
 selectActivity={selectActivity}
 />

    </Grid2>

    <Grid2 size={3}>
        {selectedActivity && <ActivityDetails 
         activity={selectedActivity}
         cancelSelectActivity={cancelSelectActivity}
         />}
    </Grid2>

</Grid2>
  )
}
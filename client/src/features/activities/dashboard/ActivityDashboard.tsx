import { Grid} from '@mui/material'; 
import ActivityList from './ActivityList';

// type Props = {
// activities:Activity[];
// selectActivity: (id:string) => void;
// cancelSelectActivity:() => void;
// selectedActivity?:Activity | undefined;

// openForm:(id:string)=> void;
// closeForm:() =>void;
// editMode:boolean
// // submitForm:(activity:Activity) => void
// // deleteActivity:(id:string)=> void
// }

export default function ActivityDashboard() {
  // // making use of custom hook
  // const {activities, isPending} = useActivities();

  // if(!activities|| isPending) return <Typography>Loading...</Typography>
  
  return (
   <Grid container spacing={3}>
      <Grid size={7}>
      <ActivityList 
      // activities={activities}
      // selectActivity = {selectActivity}
      // deleteActivity ={deleteActivity}
      
      />
      </Grid>
      <Grid size={5}>
        Activity Filters go here
      </Grid>
   </Grid>
  );
}

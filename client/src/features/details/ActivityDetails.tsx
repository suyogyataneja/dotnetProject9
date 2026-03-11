import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useActivities } from "../../lib/hooks/useActivities";

type Props = {

    selectedActivity: Activity // property name 'activity' of type Activity object: type of data we expect to receive from parent component
    cancelSelectActivity: () => void; // property name 'cancelSelectActivity' of type function that takes no arguments and returns void: type of data we expect to receive from parent component
    openForm: (id:string) => void; // property name 'openForm' of type function that takes no arguments and returns void: type of data we expect to receive from parent component 
}

export default function ActivityDetails({selectedActivity, cancelSelectActivity, openForm}: Props) {

  const {activities}  = useActivities(); // Custom hook to fetch activities using react-query
  const activity = activities?.find(x => x.id === selectedActivity.id); // Find the activity with the matching id from the activities array
  
  if(!activity) return <Typography variant="h5" color="error">Loading......</Typography> // If no activity is found, display an error message
  return (

    <Card sx= {{borderRadius: 3}}>
        <CardMedia 
        component="img" 
        height="140"
        src={`/images/categoryImages/${activity.category}.jpg`}
         alt={activity.category} />

         <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
            <Typography variant="body1">{activity.description}</Typography> 
         </CardContent>

        <CardActions>
            <Button onClick={() => openForm(activity.id)} color="primary" variant="contained">Edit</Button>
            <Button onClick={cancelSelectActivity} color="inherit" variant="contained">Cancel</Button>

        </CardActions>


    </Card>

  )
}
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../lib/hooks/useActivities";


export default function ActivityDetails() {


  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const {id} = useParams(); // Get the activity id from the URL using the usePagination hook
  const {activity, isLoadingActivity}= useActivities(id); // Custom hook to fetch activities using react-query, passing the activity id to fetch the specific activity details


  if(isLoadingActivity) return <Typography variant="h5" color="primary">Loading...</Typography> // Display a loading message while the activity details are being fetched
  if(!activity) return <Typography variant="h5" color="error">Activity not found</Typography> // If no activity is found, display an error message
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

            
            <Button component={Link} to={`/manage/${activity.id}`} color="primary" variant="contained">Edit</Button>
            <Button onClick={() => navigate('/activities')} color="inherit" variant="contained">Cancel</Button>

        </CardActions>


    </Card>

  )
}
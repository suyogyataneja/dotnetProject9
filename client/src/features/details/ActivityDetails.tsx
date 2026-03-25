import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";


export default function ActivityDetails() {


  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const activity = {} as Activity; // Placeholder for the activity object, which will be fetched using the useActivities hook


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

            
            <Button component={Link} to={`/activities/${activity.id}`} color="primary" variant="contained">Edit</Button>
            <Button onClick={() => navigate('/activities')} color="inherit" variant="contained">Cancel</Button>

        </CardActions>


    </Card>

  )
}
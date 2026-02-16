import type { BorderAll } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {

    activity: Activity // property name 'activity' of type Activity object: type of data we expect to receive from parent component
}

export default function ActivityDetails({activity}: Props) {
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
            <Button color="primary" variant="contained">Edit</Button>
            <Button color="inherit" variant="contained">Cancel</Button>

        </CardActions>


    </Card>

  )
}
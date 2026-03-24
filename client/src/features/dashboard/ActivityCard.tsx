import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../lib/hooks/useActivities";

type Props = {
    activity: Activity // property name 'activities' of type array of Activity objects: type of data we expect to receive from parent component
    selectActivity: (id: string) => void ;// property name 'selectActivity' of type function that takes a string argument and returns void: type of data we expect to receive from parent component
  }

export default function ActivityCard({activity, selectActivity  }: Props) {

  const {deleteActivity} = useActivities(); // Custom hook to fetch activities using react-query
  return (
     <Card sx={{borderRadius: 3}}>
      <CardContent>
        <Typography variant="h5">
          {activity.title}
        </Typography>

        <Typography sx={{color: 'text.secondary', mb: 1}}>
          {activity.date}
        </Typography>

        <Typography variant="body2">
          {activity.description}
        </Typography>

        <Typography variant="subtitle1" >
          {activity.city} / {activity.venue}    
        </Typography>

      </CardContent>

      <CardActions sx ={{display: 'flex', justifyContent: 'space-between', px: 2, pb: 2}}>
        <Chip label={activity.category} variant="outlined"/>
        <Box display='flex' gap={3}>

        <Button  onClick= {() => selectActivity(activity.id)} size="medium" variant="contained">
          View</Button>

        <Button 
        onClick={() => deleteActivity.mutate(activity.id)}
        disabled={deleteActivity?.isPending}
        size="medium"
        variant="contained" color="error">
          Delete</Button>
        </Box>

      </CardActions>
    </Card>
  )
}
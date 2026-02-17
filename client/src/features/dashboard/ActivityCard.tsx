import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"

type Props = {
    activity: Activity // property name 'activities' of type array of Activity objects: type of data we expect to receive from parent component
    selectActivity: (id: string) => void ;// property name 'selectActivity' of type function that takes a string argument and returns void: type of data we expect to receive from parent component
}

export default function ActivityCard({activity, selectActivity}: Props) {
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
        <Button  onClick= {() => selectActivity(activity.id)} size="medium" variant="contained">View</Button>
      </CardActions>
    </Card>
  )
}
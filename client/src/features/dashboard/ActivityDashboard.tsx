import { Grid2, List, ListItem, ListItemText } from "@mui/material";


//DEFINING PROPS WHICH OUR COMPONENT EXPECTS TO RECEIVE FROM ITS PARENT COMPONENT (APP.tsx)
type Props = {
    activities: Activity[] // property name 'activities' of type array of Activity objects: type of data we expect to receive from parent component
}

export default function ActivityDashboard({activities}: Props) {
  return (
<Grid2 container spacing={2}>
    <Grid2 size={9}>
        
        <List>

          {activities.map(activity => (
            <ListItem key={activity.id}>
              <ListItemText >{activity.title}</ListItemText>
            </ListItem>
          ))}
        </List>

    </Grid2>

</Grid2>
  )
}
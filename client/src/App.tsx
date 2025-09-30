import { List, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react"

function App(){

const [activities, setActivties]= useState<Activity[]>([]);

useEffect(() => {

  axios.get<Activity[]>('https://localhost:5001/api/activities')
 
  .then(response => setActivties(response.data))

},[])

const title = 'Welcome to Reactivities'
return (
  <>
  <Typography variant='h3'>{title}</Typography>
  <List>
    {activities.map((activity) => (

      <ListItem key={activity.id}>
        <ListItemText>{activity.title}</ListItemText>

      </ListItem>
    ))}

  </List>
  </>
)



}

export default App
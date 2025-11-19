import { Container, CssBaseline, List, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";

function App(){

const [activities, setActivties]= useState<Activity[]>([]);

useEffect(() => {

  axios.get<Activity[]>('https://localhost:5001/api/activities')
 
  .then(response => setActivties(response.data))

},[])

const title = 'Welcome to Reactivities'
return (
  <>
  <CssBaseline/>
  <NavBar/>
<Container maxWidth='xl'sx={{mt:3}}>
  <List>
    {activities.map((activity) => (

      <ListItem key={activity.id}>
        <ListItemText>{activity.title}</ListItemText>

      </ListItem>
    ))}

  </List>
  
</Container>


  </>
)



}

export default App
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

<ActivityDashboard activities={activities}/>
  
</Container>


  </>
)



}

export default App
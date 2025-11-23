import { Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

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
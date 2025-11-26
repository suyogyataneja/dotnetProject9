import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App(){

const [activities, setActivties]= useState<Activity[]>([]);

// use state hook lets you add a state-variable to your component
// It takes an initial value of state variable as an argument and 
// provides with STATE VARIABLE and a setter function
// for example - const(values cannot change during the lifetime of a program)
// const [CURRENT STATE VALUE(selectedActivity),FUNCTION TO UPDATE THE 
// STATE(setSelectedActivity]= useState(Initialise state)

const [selectedActivity,setSelectedActivity]= useState<Activity |undefinedy>(undefined);

useEffect(() => {

  axios.get<Activity[]>('https://localhost:5001/api/activities')
 
  .then(response => setActivties(response.data))

},[])

// Create a helper function inside a function here

const handleSelectActivity = (id:string) =>{

  // In Javascript for equality checks we use == while in typescript we use ===
  setSelectedActivity(activities.find(x =>x.id === id))
}

//create another helper function
const handleCancelSelectActivity =() =>{

  setSelectedActivity(undefined);
}

const title = 'Welcome to Reactivities'
return (
  <Box sx={{bgcolor:'#eeeeee'}}>
  <CssBaseline/>
  <NavBar/>
<Container maxWidth='xl'sx={{mt:3}}>

<ActivityDashboard 
activities={activities}
selectActivity={handleSelectActivity}
cancelSelectActivity={handleCancelSelectActivity}
selectedActivity={selectedActivity}
/>
  
</Container>


  </Box>
)



}

export default App
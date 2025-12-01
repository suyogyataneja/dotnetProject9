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


const [editMode,setEditMode] = useState(false);

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


//create another helper to handle opening of the form

const handleOpenForm = (id?:string) => {
if(id) handleSelectActivity(id);
else handleCancelSelectActivity();
setEditMode(true);

} 

//create another helper to handle closing of the form
const handleFormClose =() =>{
  setEditMode(false);

}

// another helper function to save submitted form data

const handleSubmitForm = (activity:Activity) =>{

  if(activity.id){
    setActivties(activities.map(x=>x.id === activity.id ? activity : x))
  }
  else{
    const newActivity = {...activity, id: activities.length.toString()}

    setSelectedActivity(newActivity);
    setActivties([...activities, newActivity])
  }
  setEditMode(false);
}

// helper function to delete activity

const handleDelete = (id:string) =>{

  setActivties(activities.filter(x=> x.id !== id))
}

const title = 'Welcome to Reactivities'
return (
  <Box sx={{bgcolor:'#eeeeee'}}>
  <CssBaseline/>
  <NavBar openForm={handleOpenForm}/>
<Container maxWidth='xl'sx={{mt:3}}>

<ActivityDashboard 
activities={activities}
selectActivity={handleSelectActivity}
cancelSelectActivity={handleCancelSelectActivity}
selectedActivity={selectedActivity}

editMode={editMode}
openForm ={handleOpenForm}
closeForm ={handleFormClose}

submitForm ={handleSubmitForm}
deleteActivity={handleDelete}

/>
  
</Container>


  </Box>
)



}

export default App
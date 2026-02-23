import { act, Activity, useEffect, useState } from 'react'
import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';


function App() {


  // useState Hook allowing us to manage state in a functional component
  const [activities, setActivities] = useState<Activity[]> ([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/Activities')// fetch returns a java script promise
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching activities:', error))

      return () => {}
  }, []); // Empty dependency array means this effect runs once on mount

  //using an array function to render the list of activities in the UI

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id))
  }
  
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleOpenForm = (id?: string) => {

    if(id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {

    if(activity.id) {

      setActivities(activities.map(x=> x.id === activity.id ? activity : x));

    }
      else {
        const newActivity = {...activity, id: activities.length.toString()}; 
        setSelectedActivity(newActivity); 
        setActivities([...activities, newActivity]);

      }
    setEditMode(false);
  }

  return (
    <Box sx={{bgcolor : '#eeee'}}>
      <CssBaseline/>
      <NavBar openForm={handleOpenForm}  />

      <Container maxWidth="xl" sx={{mt: 3}}>

        <ActivityDashboard 
        activities={activities}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
      
        openForm={handleOpenForm}
        closeForm={handleFormClose}
        submitForm={handleSubmitForm}   

        />
      </Container>

    
    </Box>
  )
}

export default App

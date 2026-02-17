import { useEffect, useState } from 'react'
import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';


function App() {


  // useState Hook allowing us to manage state in a functional component
  const [activities, setActivities] = useState<Activity[]> ([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

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

  return (
    <Box sx={{bgcolor : '#eeee'}}>
      <CssBaseline/>
      <NavBar />

      <Container maxWidth="xl" sx={{mt: 3}}>

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

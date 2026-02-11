import { useEffect, useState } from 'react'
import { Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/ActivityDashboard';

function App() {


  // useState Hook allowing us to manage state in a functional component
  const [activities, setActivities] = useState<Activity[]> ([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/Activities')// fetch returns a java script promise
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching activities:', error))

      return () => {}
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <CssBaseline/>
      <NavBar />

      <Container maxWidth="xl" sx={{mt: 3}}>

        <ActivityDashboard activities={activities}/>
      </Container>

    
    </>
  )
}

export default App

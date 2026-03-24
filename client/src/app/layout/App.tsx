import { useState } from 'react'
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/hooks/useActivities';


function App() {


  // useState Hook allowing us to manage state in a functional component
  // const [activities, setActivities] = useState<Activity[]> ([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);

  const {activities, isPending} = useActivities(); // Custom hook to fetch activities using react-query
  



  // useEffect(() => {
  //   axios.get<Activity[]>('https://localhost:5001/api/Activities')// fetch returns a java script promise
  //     .then(response => setActivities(response.data))
  //     .catch(error => console.error('Error fetching activities:', error))

  //     return () => {}
  // }, []); // Empty dependency array means this effect runs once on mount

  //using an array function to render the list of activities in the UI

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(a => a.id === id))
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

  return (
    <Box sx={{bgcolor : '#eeee', minHeight: '100vh'}}>
      <CssBaseline/>
      <NavBar openForm={handleOpenForm}  />

      <Container maxWidth="xl" sx={{mt: 3}}>
        {!activities || isPending ?( 
          <Typography>Loading activities...</Typography> )
            :(

            <ActivityDashboard 
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
          
            openForm={handleOpenForm}
            closeForm={handleFormClose}
       

            />

        )}


      </Container>

    
    </Box>
  )
}

export default App

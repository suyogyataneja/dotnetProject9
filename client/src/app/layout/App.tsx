import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router';


function App() {


  // useState Hook allowing us to manage state in a functional component
  // const [activities, setActivities] = useState<Activity[]> ([]);

  



  // useEffect(() => {
  //   axios.get<Activity[]>('https://localhost:5001/api/Activities')// fetch returns a java script promise
  //     .then(response => setActivities(response.data))
  //     .catch(error => console.error('Error fetching activities:', error))

  //     return () => {}
  // }, []); // Empty dependency array means this effect runs once on mount

  //using an array function to render the list of activities in the UI

 

  return (
    <Box sx={{bgcolor : '#eeee', minHeight: '100vh'}}>
      <CssBaseline/>
      <NavBar />

      <Container maxWidth="xl" sx={{mt: 3}}>
    <Outlet/> {/* This is where the child routes will be rendered based on the current URL */}
      </Container>

    
    </Box>
  )
}

export default App

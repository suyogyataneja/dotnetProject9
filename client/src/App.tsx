
import { useEffect, useState } from 'react'
import './App.css'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

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
      <Typography variant="h3" >Reactivities</Typography>

      <List>

        {activities.map(activity => (
          <ListItem key={activity.id}>
            <ListItemText >{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default App

import { useEffect, useState } from 'react';

import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';

function App() {
  
  const[activities, setActivties] = useState<Activity[]>([]);

  useEffect (()=> {
    axios.get<Activity[]>('https://localhost:5001/api/Activities')
    .then(response => setActivties(response.data))

    return () => {}
  },[])

 
  return (
<>
      <NavBar/>
      <List>
        {activities.map((activity)=>(
          <ListItem key={activity.id}>
            
            <ListItemText>{activity.title}
            </ListItemText>   
          </ListItem>
        ))}
      </List>
  </>  
  )
}

export default App

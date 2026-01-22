import { useEffect, useState } from 'react';

import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  
  const[activities, setActivties] = useState<Activity[]>([]);

  useEffect (()=> {
    axios.get<Activity[]>('https://localhost:5001/api/Activities')
    .then(response => setActivties(response.data))

    return () => {}
  },[])

 
  return (
<>
      <Typography variant='h3'>Reactivties</Typography>
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

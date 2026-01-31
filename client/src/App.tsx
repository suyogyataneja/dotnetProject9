
import { useEffect, useState } from 'react'
import './App.css'

function App() {


  // useState Hook allowing us to manage state in a functional component
  const [activities, setActivities] = useState<Activity[]> ([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/Activities')// fetch returns a java script promise
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error))

      return () => {}
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <h3 className="app">Reactivities</h3>

      <ul>

        {activities.map(activity => (
          <li key={activity.id}>
            {activity.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App

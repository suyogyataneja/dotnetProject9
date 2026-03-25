import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/dashboard/ActivityDashboard";
import ActivityForm from "../../features/form/ActivityForm";

export const router = createBrowserRouter([
  {
    path  : "/", // This is the root path of the application
    element : <App/>, // This specifies that when the user navigates to the root path, the App component will be rendered
    children:[

        {path:'', element: <HomePage/>},
        {path:'activities', element: <ActivityDashboard/>},
        {path:'activities/:id', element: <ActivityForm/>}
    ]
}
])

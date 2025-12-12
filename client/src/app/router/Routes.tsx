import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/activities/home/homepage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";

export const router = createBrowserRouter([

    {

        path :'/',
        element:<App />,
        children:[
            {path:'',element:<HomePage/>},
            {path:'activities',element:<ActivityDashboard/>},
            {path:'createActivity',element:<ActivityForm/>},
            {path:'',element:<HomePage/>},
        ]

    }
])
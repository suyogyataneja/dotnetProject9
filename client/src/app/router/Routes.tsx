import { createBrowserRouter } from "react-router";
import App from "../layout/App";

export const router = createBrowserRouter([
  {
    path  : "/", // This is the root path of the application
    element : <App/> // This specifies that when the user navigates to the root path, the App component will be rendered
  }
])

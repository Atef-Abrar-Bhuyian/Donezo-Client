import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:"/",
            element:<Login></Login>
        },
        {
            path:"/register",
            element:<Register></Register>
        },
      ]
    },
    {
        path:"dashboard",
        element:<Dashboard></Dashboard>,
    }
  ]);

  export default router;
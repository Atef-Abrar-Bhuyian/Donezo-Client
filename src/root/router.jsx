import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:"/",
            element:<Login></Login>
        }
      ]
    },
  ]);

  export default router;
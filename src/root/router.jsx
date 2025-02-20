import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import NewTask from "../Pages/Dashboard/NewTask/NewTask";
import ToDo from "../Pages/Dashboard/ToDo/ToDo";
import InProgress from "../Pages/Dashboard/InProgress/InProgress";
import Done from "../Pages/Dashboard/Done/Done";
import ActivityLog from "../Pages/Dashboard/ActivityLog/ActivityLog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <NewTask></NewTask>,
      },
      {
        path: "toDo",
        element: <ToDo></ToDo>,
      },
      {
        path: "inProgress",
        element: <InProgress></InProgress>,
      },
      {
        path: "Done",
        element: <Done></Done>,
      },
      {
        path: "ActivityLog",
        element: <ActivityLog></ActivityLog>,
      },
    ],
  },
]);

export default router;

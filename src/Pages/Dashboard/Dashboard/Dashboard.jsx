import { FaClipboardList, FaHistory, FaListUl } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { MdDoneAll } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row gap-20">
      {/* Dashboard Side bar */}
      <div className="md:w-44 md:min-h-screen bg-purple-300 p-5">
        <div className="flex flex-col items-center md:items-start justify-center">
          <img
            className="w-24 rounded-full"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
            alt="User Image"
          />
          <p className="mt-4">email@mail,com</p>
          <p className="mt-4">Name</p>
          <div className="divider"></div>
          <ul className="menu p-0 gap-3 flex-row">
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white">
              <NavLink
                className={` font-bold ${
                  location.pathname === "/dashboard" ||
                  location.pathname === "/dashboard/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/dashboard/"}
              >
                <FaClipboardList />
                User Home
              </NavLink>
            </li>
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white">
              <NavLink
                className={` font-bold ${
                  location.pathname === "/" || location.pathname === "/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/"}
              >
                <FaListUl />
                To Do
              </NavLink>
            </li>
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white">
              <NavLink
                className={` font-bold ${
                  location.pathname === "/" || location.pathname === "/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/"}
              >
                <IoMdTimer />
                In Progress
              </NavLink>
            </li>
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white">
              <NavLink
                className={` font-bold ${
                  location.pathname === "/" || location.pathname === "/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/"}
              >
                <MdDoneAll />
                Done
              </NavLink>
            </li>
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white">
              <NavLink
                className={` font-bold ${
                  location.pathname === "/" || location.pathname === "/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/"}
              >
                <FaHistory />
                Activity Log
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* Dashboard Content */}
      <div className="flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

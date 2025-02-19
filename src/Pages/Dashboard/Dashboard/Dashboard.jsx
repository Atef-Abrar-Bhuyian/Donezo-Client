import { FaClipboardList, FaHistory, FaListUl } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { MdDoneAll } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../../../Components/Footer";

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row">
      {/* Dashboard Side bar */}
      <div className="md:w-64 md:min-h-screen bg-purple-300 dark:bg-purple-900 p-5">
        <div className="flex flex-col items-center md:items-start justify-center">
          <img
            className="w-24 rounded-full"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
            alt="User Image"
          />
          <p className="mt-4 text-purple-900 dark:text-white">
            abrarbhuyian8@gmail.com
          </p>
          <p className="mt-4 text-purple-900 dark:text-white">
            Md. Atef Abrar Bhuyian
          </p>
          <div className="divider dark:border-gray-700"></div>
          <ul className="menu p-0 gap-3 flex-row md:flex-col">
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white dark:text-white dark:hover:text-black">
              <NavLink
                className={`font-bold ${
                  location.pathname === "/dashboard" ||
                  location.pathname === "/dashboard/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/dashboard/"}
              >
                <FaClipboardList />
                New Task
              </NavLink>
            </li>
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white dark:text-white dark:hover:text-black">
              <NavLink
                className={`font-bold ${
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
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white dark:text-white dark:hover:text-black">
              <NavLink
                className={`font-bold ${
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
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white dark:text-white dark:hover:text-black">
              <NavLink
                className={`font-bold ${
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
            <li className="hover:bg-neutral rounded-lg text-purple-900 hover:text-white dark:text-white dark:hover:text-black">
              <NavLink
                className={`font-bold ${
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
            <li className="rounded-lg text-purple-900 dark:text-white">
              <label className="flex cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  type="checkbox"
                  value="dark"
                  className="toggle theme-controller"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div>
            <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { FaClipboardList, FaHistory, FaListUl } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { MdDoneAll } from "react-icons/md";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer";
import useAuth from "../../../hooks/useAuth";
import { CiLogout } from "react-icons/ci";
import Swal from "sweetalert2";

const Dashboard = () => {
  const location = useLocation();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logout Successful",
          background: "#6b21a8",
          color: "#fff",
          confirmButtonColor: "#3b0764",
          showClass: {
            popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
          },
          hideClass: {
            popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
          },
        });
        navigate("/")
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Dashboard Side bar */}
      <div className="md:w-64 md:min-h-screen bg-purple-300 dark:bg-purple-900 p-5 flex flex-col justify-between lg:fixed lg:h-full">
        <div className="flex flex-col items-center md:items-start justify-center">
          <img
            className="w-24 rounded-full"
            src={user?.photoURL}
            alt="User Image"
          />
          <p className="mt-4 text-purple-900 dark:text-white">{user?.email}</p>
          <p className="mt-4 text-purple-900 dark:text-white">
            {user?.displayName}
          </p>
          <div className="divider dark:border-white-700"></div>
          <ul className="menu p-0 gap-3 flex-row md:flex-col">
            <li className="hover:bg-black rounded-lg text-purple-900 hover:text-white dark:text-white  ">
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
            <li className="hover:bg-black rounded-lg text-purple-900 hover:text-white dark:text-white  ">
              <NavLink
                className={`font-bold ${
                  location.pathname === "/dashboard/toDo" || location.pathname === "/dashboard/toDo/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/dashboard/toDo"}
              >
                <FaListUl />
                To Do
              </NavLink>
            </li>
            <li className="hover:bg-black rounded-lg text-purple-900 hover:text-white dark:text-white  ">
              <NavLink
                className={`font-bold ${
                  location.pathname === "/dashboard/InProgress" || location.pathname === "/dashboard/InProgress/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/dashboard/InProgress"}
              >
                <IoMdTimer />
                In Progress
              </NavLink>
            </li>
            <li className="hover:bg-black rounded-lg text-purple-900 hover:text-white dark:text-white  ">
              <NavLink
                className={`font-bold ${
                  location.pathname === "/dashboard/Done" || location.pathname === "/dashboard/Done/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/dashboard/Done"}
              >
                <MdDoneAll />
                Done
              </NavLink>
            </li>
            <li className="hover:bg-black rounded-lg text-purple-900 hover:text-white dark:text-white  ">
              <NavLink
                className={`font-bold ${
                  location.pathname === "/" || location.pathname === "/"
                    ? "bg-black text-white"
                    : ""
                }`}
                to={"/dashboard/ActivityLog"}
              >
                <FaHistory />
                Activity Log <sup className="badge-xs badge">Beta</sup>
              </NavLink>
            </li>
            {/* Theme Controller */}
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
        <div className="w-full">
          <button onClick={handleLogOut} className="btn flex items-center justify-center w-full transition-all hover:bg-purple-950 hover:text-white shadow-none duration-300 border-none">
            <CiLogout />
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 lg:ml-64 flex flex-col p-6 overflow-y-auto">
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

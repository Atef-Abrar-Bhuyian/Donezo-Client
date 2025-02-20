import { Fade } from "react-awesome-reveal";
import donezoLogo from "../../assets/denzoLogo/denzo-bg-remove.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogIn from "../../Components/GoogleLogIn/GoogleLogIn";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        updateUserProfile(displayName, photoURL)
          .then(() => {
            // Create user entry in the database
            const userInfo = { displayName, photoURL, email };
            axiosPublic
              .post("/users", userInfo)
              // toast and navigate to dashboard
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    title: "Profile Created Successfully",
                    background: "#6b21a8",
                    color: "#fff",
                    confirmButtonColor: "#3b0764",
                    showClass: {
                      popup:
                        "animate__animated animate__fadeInUp animate__faster",
                    },
                    hideClass: {
                      popup:
                        "animate__animated animate__fadeOutDown animate__faster",
                    },
                  }).then(() => {
                    navigate("/dashboard");
                  });
                } else {
                  toast.error("User creation failed. Please try again later.");
                }
              })
              .catch((err) => {
                toast.error(
                  err.message || "Database Error! Please try again later"
                );
              });
          })
          .catch((err) => {
            toast.error(`${err.message}`);
          });
      })
      .catch((err) => {
        toast.error(
          err.message || "Registration failed. Please try again later."
        );
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 transition-all duration-300">
      {/* Right Section - Branding */}
      <div className="bg-purple-200 flex-1 flex flex-col items-center justify-center p-10">
        <img
          src={donezoLogo}
          alt="Donezo Logo"
          className="border border-purple-600 rounded-full shadow-2xl shadow-black cursor-pointer animate__animated animate__jackInTheBox"
        />
      </div>

      {/* Left Section - Login Form */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 md:px-12 mt-10">
        <Fade direction="left">
          <div className="bg-purple-200 shadow-2xl shadow-purple-900 p-8 rounded-xl w-full max-w-md ">
            <h1 className="text-3xl font-bold text-purple-950 text-center ">
              Register Now!
            </h1>
            <p className="text-purple-600 text-center mt-2">
              Sign up now for manage your task smoothly.
            </p>

            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-200 text-gray-900"
                />
              </div>
              {/* Email Input */}
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  PhotoURL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-200 text-gray-900"
                />
              </div>
              {/* Email Input */}
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-200 text-gray-900"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-200 text-gray-900"
                />
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-purple-800 hover:bg-purple-950 text-white py-3 rounded-lg 
                font-semibold transition-all duration-300 cursor-pointer"
              >
                Register
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center my-4">
              <span className="w-1/3 border-t border-gray-400"></span>
              <span className="mx-3 text-black">OR</span>
              <span className="w-1/3 border-t border-gray-400"></span>
            </div>

            {/* Google Login Button */}
            <GoogleLogIn></GoogleLogIn>

            <p className="mt-4 text-black">
              Already have an account?
              <Link
                to={"/"}
                className="font-bold text-purple-800 hover:text-purple-950 underline"
              >
                Login Now
              </Link>
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Register;

import { Fade } from "react-awesome-reveal";
import donezoLogo from "../../assets/denzoLogo/denzo-bg-remove.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="min-h-screen flex md:flex-row flex-col-reverse bg-gray-100 transition-all duration-300">
      {/* Left Section - Login Form */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 md:px-12 mt-10">
        <Fade direction="right">
          <div className="bg-purple-200 shadow-2xl shadow-purple-900 p-8 rounded-xl w-full max-w-md ">
            <h1 className="text-3xl font-bold text-purple-950 text-center ">
              Welcome Back!
            </h1>
            <p className="text-purple-600 text-center mt-2">
              Login to continue managing your tasks.
            </p>

            <div className="mt-6 space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
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
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-200 text-gray-900"
                />
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-purple-800 hover:bg-purple-950 text-white py-3 rounded-lg 
                font-semibold transition-all duration-300 cursor-pointer"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-4">
              <span className="w-1/3 border-t border-gray-400"></span>
              <span className="mx-3 text-black">OR</span>
              <span className="w-1/3 border-t border-gray-400"></span>
            </div>

            {/* Google Login Button */}
            <button className="w-full flex items-center justify-center gap-2 text-white py-3 rounded-lg font-semibold bg-purple-800 hover:bg-purple-950 transition-all duration-200 cursor-pointer">
            <FcGoogle className="text-xl"/>
              Login with Google
            </button>

            <p className="mt-4 text-black">
              Don&apos;t have an account?{" "}
              <Link
                to={"/register"}
                className="font-bold text-purple-800 hover:text-purple-950 underline"
              >
                Register Now
              </Link>
            </p>
          </div>
        </Fade>
      </div>

      {/* Right Section - Branding */}
      <div className="bg-purple-200 flex-1 flex flex-col items-center justify-center p-10">
        <img
          src={donezoLogo}
          alt="Donezo Logo"
          className="border border-purple-600 rounded-full shadow-2xl shadow-black cursor-pointer animate__animated animate__jackInTheBox"
        />
      </div>
    </div>
  );
};

export default Login;

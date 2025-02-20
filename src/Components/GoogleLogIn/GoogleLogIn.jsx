import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLogIn = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      // console.log(result);
      const userInfo = {
        email: result?.user?.email,
        displayName: result?.user?.displayName,
        photoURL: result?.user?.photoURL,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        Swal.fire({
          title: "Login Successful",
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
        navigate("/dashboard");
      });
    });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 text-white py-3 rounded-lg font-semibold bg-purple-800 hover:bg-purple-950 transition-all duration-200 cursor-pointer"
      >
        <FcGoogle className="text-xl" />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogIn;

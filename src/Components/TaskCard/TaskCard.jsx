import { LuEye } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useWebSocket from "../../hooks/useWebSocket";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const TaskCard = ({ title, category, taskDueDate, _id, setTasks }) => {
  const { user } = useAuth();
  const { ws } = useWebSocket(user?.email);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#3b0764",
      color: "#fff",
      confirmButtonColor: "#6b21a8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: "TASK_DELETE",
              _id,
              userId: user?.email,
            })
          );
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
        } else {
          toast.error("Error!", "WebSocket is not connected!", "error");
        }
      }
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md cursor-pointer my-4 draggable">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold ">{title}</h2>
        <div className="flex gap-2">
          <button className="text-xl cursor-pointer hover:text-purple-900">
            <LuEye />
          </button>
          <button
            className="text-xl cursor-pointer hover:text-purple-900"
            onClick={handleDelete}
          >
            <RiDeleteBin2Line />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 text-sm text-white">
        <span
          className={`px-3 py-1 rounded-full text-black ${
            category === "ToDo"
              ? "bg-purple-200"
              : category === "InProgress"
              ? "bg-purple-400"
              : category === "Done"
              ? "bg-green-200"
              : "bg-gray-200"
          }`}
        >
          {category}
        </span>
        {taskDueDate && (
          <span
            className={`text-xs text-black px-2 py-1 rounded ${
              new Date(taskDueDate) < new Date() ? "bg-red-200" : "bg-green-200"
            }`}
          >
            Due: {new Date(taskDueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

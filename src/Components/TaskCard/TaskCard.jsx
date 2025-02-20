import { LuEye } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useWebSocket from "../../hooks/useWebSocket";
import { toast } from "react-toastify";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const TaskCard = ({ title, category, taskDueDate, _id }) => {
  const { user } = useAuth();
  const { ws, setTasks } = useWebSocket(user?.email);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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
        } else {
          toast.error("WebSocket is not connected!");
        }
      }
    });
  };

  // ✅ Use `useEffect` to assign `onmessage` safely
  useEffect(() => {
    if (!ws) return; // Prevent error if ws is null

    const handleWebSocketMessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);

      if (data.type === "TASK_DELETED") {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== data.taskId)
        );
        toast.success("Task deleted successfully!");
      }
    };

    ws.onmessage = handleWebSocketMessage;

    // Cleanup function to avoid memory leaks
    return () => {
      ws.onmessage = null;
    };
  }, [ws, setTasks]); // Re-run if ws or setTasks changes

  return (
    <div className="border rounded-lg p-4 shadow-md cursor-pointer my-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
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
        <span className="px-3 py-1 bg-purple-200 text-black rounded-full">
          {category}
        </span>
        {taskDueDate && (
          <span className="text-xs text-black bg-white">
            Due: {new Date(taskDueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

import { LuEye } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useWebSocket from "../../hooks/useWebSocket";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskCard = ({
  title,
  category,
  taskDueDate,
  _id,
  setTasks,
  description,
}) => {
  const { user } = useAuth();
  const { ws } = useWebSocket(user?.email);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);

  // State for editing a task
  const [taskData, setTaskData] = useState({
    title,
    description,
    category,
    taskDueDate: taskDueDate ? new Date(taskDueDate) : null,
  });

  useEffect(() => {
    setTaskData({
      title,
      description,
      category,
      taskDueDate: taskDueDate ? new Date(taskDueDate) : null,
    });
  }, [title, description, category, taskDueDate]);

  // Task Delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      color: "#000",
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
          toast.error("WebSocket Disconnected! Please reload and try again.");
        }
      }
    });
  };
  const handleOpenEditModal = () => {
    if (editModal) editModal.showModal();
  };

  // Task Update
  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "TASK_UPDATE",
          _id,
          userId: user?.email,
          updatedData: {
            ...taskData,
          },
        })
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === _id ? { ...task, ...taskData } : task
        )
      );

      toast.success("Task updated successfully!");
      editModal.close();
    } else {
      toast.error("WebSocket is not connected! Please refresh and try again.");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md cursor-pointer my-4 draggable">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button
            className="text-xl cursor-pointer hover:text-purple-900"
            onClick={() => viewModal?.showModal()}
          >
            <LuEye />
          </button>
          <button
            className="text-xl cursor-pointer hover:text-purple-900"
            onClick={handleOpenEditModal}
          >
            <FiEdit />
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

      {/* View Task Modal */}
      <dialog ref={setViewModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="flex items-center justify-between">
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
                  new Date(taskDueDate) < new Date()
                    ? "bg-red-200"
                    : "bg-green-200"
                }`}
              >
                Due: {new Date(taskDueDate).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit Task Modal */}
      <dialog ref={setEditModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center">Edit Task</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="mt-4">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={taskData.description}
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Category</label>
              <select
                className="select select-bordered w-full"
                value={taskData.category}
                onChange={(e) =>
                  setTaskData({ ...taskData, category: e.target.value })
                }
                required
              >
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Due Date</label>
              <DatePicker
                selected={taskData.taskDueDate}
                onChange={(date) =>
                  setTaskData({ ...taskData, taskDueDate: date })
                }
                dateFormat="yyyy-MM-dd"
                className="input input-bordered w-full"
                placeholderText="Select Due Date"
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => editModal.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TaskCard;

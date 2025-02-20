import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useWebSocket from "../../../hooks/useWebSocket";

const NewTask = () => {
  const { user } = useAuth();
  const [modal, setModal] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const { ws } = useWebSocket(user?.email);

  const handleOpenModal = () => {
    if (modal) modal.showModal();
  };

  const handleAddNewTaskSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value;
    const userEmail = user?.email;
    const createdAt = new Date().toISOString();
    const taskDueDate = startDate?.toISOString() || null;

    if (title.length > 50) {
      toast.error("Title must be 50 characters or less.");
      return;
    }

    if (description.length > 200) {
      toast.error("Description must be 200 characters or less.");
      return;
    }

    const newTask = {
      title,
      description,
      category,
      userEmail,
      createdAt,
      taskDueDate,
    };

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "TASK_UPDATE", userId: userEmail, task: newTask }));
    } else {
      toast.error("WebSocket is not connected!");
    }

    if (modal) modal.close();
    form.reset();
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div>
        {/* Open modal on button click */}
        <button className="btn flex items-center" onClick={handleOpenModal}>
          Add New Task <FaPlus />
        </button>
      </div>

      <div className="my-10">
        <Fade>
          <h1 className="text-2xl text-center font-bold">All Task</h1>
        </Fade>
        <div className="my-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
          <div className="border-2 rounded-lg">
            <h1 className="text-center font-semibold">To Do</h1>
          </div>
          <div className="border-2 rounded-lg">
            <h1 className="text-center font-semibold">In Progress</h1>
          </div>
          <div className="border-2 rounded-lg">
            <h1 className="text-center font-semibold">Done</h1>
          </div>
        </div>
      </div>

      {/* Add New Task Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        ref={(el) => setModal(el)}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">ADD NEW TASK!</h3>
          <form onSubmit={handleAddNewTaskSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Title*</label>
              <input
                type="text"
                name="title"
                className="input w-full"
                required
                placeholder="Write title here"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea h-24 w-full"
                name="description"
                placeholder="Write description here"
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select Category</legend>
              <select
                name="category"
                defaultValue=""
                className="select w-full cursor-pointer"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Task Due Date<span className="text-gray-500">(If Needed)</span>{" "}
              </legend>
              <div className="flex">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Due Date"
                />
              </div>
            </fieldset>

            <button className="btn btn-neutral mt-4" type="submit">
              Submit
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* Close button */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewTask;

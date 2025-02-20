import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const NewTask = () => {
  const [modal, setModal] = useState(null);

  // Open modal function
  const handleOpenModal = () => {
    if (modal) modal.showModal();
  };

  // Handle form submission
  const handleAddNewTaskSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;

    console.log("New Task:", { title, description, category });

    // Close the modal after submission
    if (modal) modal.close();

    // Optionally, reset the form
    form.reset();
  };

  return (
    <div>
      {/* Open modal on button click */}
      <button
        className="btn flex items-center"
        onClick={handleOpenModal}
      >
        Add New Task <FaPlus />
      </button>

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

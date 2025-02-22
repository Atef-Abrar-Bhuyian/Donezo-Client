import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useWebSocket from "../../../hooks/useWebSocket";
import TaskCard from "../../../Components/TaskCard/TaskCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const NewTask = () => {
  const { user } = useAuth();
  const [modal, setModal] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const { ws, tasks, setTasks, isLoading } = useWebSocket(user?.email);

  useEffect(() => {
    console.log("Current tasks:", tasks.map(task => ({ _id: task._id, category: task.category })));
  }, [tasks]);

  if (isLoading) return <div>Loading tasks...</div>;

  const toDoTaskList = tasks?.filter((task) => task?.category === "ToDo") || [];
  const inProgressTaskList =
    tasks?.filter((task) => task?.category === "InProgress") || [];
  const doneTaskList = tasks?.filter((task) => task?.category === "Done") || [];

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

    if (title.length > 50 || description.length > 200) {
      toast.error("Title or Description is too long.");
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
      ws.send(
        JSON.stringify({
          type: "TASK_ADD",
          userId: userEmail,
          task: newTask,
        })
      );
    } else {
      toast.error("WebSocket is not connected! Please refresh and try again.");
    }

    form.reset();
    setStartDate(null);
    if (modal) modal.close();
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const categoryMap = {
      ToDo: toDoTaskList,
      InProgress: inProgressTaskList,
      Done: doneTaskList,
    };

    const sourceList = categoryMap[source.droppableId] || [];
    const destList = categoryMap[destination.droppableId] || [];

    if (source.droppableId === destination.droppableId) {
      const updatedList = Array.from(sourceList);
      const [movedTask] = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, movedTask);

      const newTasks = tasks.map((task) =>
        updatedList.find((t) => t._id === task._id) || task
      );
      setTasks(newTasks);
    } else {
      const sourceTasks = Array.from(sourceList);
      const destTasks = Array.from(destList);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.category = destination.droppableId;
      destTasks.splice(destination.index, 0, movedTask);

      const newTasks = tasks.map((task) => {
        const updatedTask =
          sourceTasks.find((t) => t._id === task._id) ||
          destTasks.find((t) => t._id === task._id);
        return updatedTask || task;
      });
      setTasks(newTasks);

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "TASK_UPDATE",
            _id: movedTask._id.toString(),
            userId: user?.email,
            task: { category: movedTask.category },
          })
        );
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <button className="btn flex items-center" onClick={handleOpenModal}>
          Add New Task <FaPlus />
        </button>
      </div>

      <div className="my-10">
        <h1 className="text-4xl text-center font-bold">All Tasks</h1>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="my-10">
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {/* ToDo Column */}
              <Droppable droppableId="ToDo">
                {(provided) => (
                  <div
                    className="border-2 rounded-lg p-2 w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h1 className="text-center font-semibold">To Do</h1>
                    <div className="flex flex-col">
                      {toDoTaskList.length > 0 ? (
                        toDoTaskList.map((task, idx) => {
                          console.log("Rendering ToDo Draggable with id:", task._id.toString());
                          return (
                            <Draggable
                              key={task._id.toString()}
                              draggableId={task._id.toString()}
                              index={idx}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard
                                    key={task._id}
                                    title={task.title}
                                    description={task.description}
                                    category={task.category}
                                    taskDueDate={task.taskDueDate}
                                    setTasks={setTasks}
                                    _id={task._id}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })
                      ) : (
                        <p className="text-center">No tasks here</p>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>

              {/* In Progress Column */}
              <Droppable droppableId="InProgress">
                {(provided) => (
                  <div
                    className="border-2 rounded-lg p-2"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h1 className="text-center font-semibold">In Progress</h1>
                    <div>
                      {inProgressTaskList.length > 0 ? (
                        inProgressTaskList.map((task, idx) => {
                          console.log("Rendering InProgress Draggable with id:", task._id.toString());
                          return (
                            <Draggable
                              key={task._id.toString()}
                              draggableId={task._id.toString()}
                              index={idx}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard
                                    key={task._id}
                                    title={task.title}
                                    description={task.description}
                                    category={task.category}
                                    taskDueDate={task.taskDueDate}
                                    setTasks={setTasks}
                                    _id={task._id}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })
                      ) : (
                        <p className="text-center">No tasks here</p>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>

              {/* Done Column */}
              <Droppable droppableId="Done">
                {(provided) => (
                  <div
                    className="border-2 rounded-lg p-2"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h1 className="text-center font-semibold">Done</h1>
                    <div>
                      {doneTaskList.length > 0 ? (
                        doneTaskList.map((task, idx) => {
                          console.log("Rendering Done Draggable with id:", task._id.toString());
                          return (
                            <Draggable
                              key={task._id.toString()}
                              draggableId={task._id.toString()}
                              index={idx}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard
                                    key={task._id}
                                    title={task.title}
                                    description={task.description}
                                    category={task.category}
                                    taskDueDate={task.taskDueDate}
                                    setTasks={setTasks}
                                    _id={task._id}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })
                      ) : (
                        <p className="text-center">No tasks here</p>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>

      {/* Modal for Adding New Task */}
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
                defaultValue="ToDo"
                className="select w-full cursor-pointer"
                required
              >
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Task Due Date<span className="text-gray-500">(If Needed)</span>
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
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewTask;
import useWebSocket from "../../../hooks/useWebSocket";
import useAuth from "../../../hooks/useAuth";
import TaskCard from "../../../Components/TaskCard/TaskCard";
import { Fade } from "react-awesome-reveal";

const InProgress = () => {
  const { user } = useAuth();
  const { tasks } = useWebSocket(user?.email);

  const inProgressList = tasks?.filter(
    (task) => task?.category === "InProgress"
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Fade>
      <h1 className="text-2xl font-bold text-center mb-4">In Progress List</h1>
      </Fade>
      <Fade delay={500}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inProgressList?.length > 0 ? (
          inProgressList?.map((task, idx) => (
            <TaskCard
              key={idx}
              _id={task?._id}
              title={task?.title}
              description={task?.description}
              category={task?.category}
              taskDueDate={task?.taskDueDate}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No tasks here
          </p>
        )}
      </div>
      </Fade>
    </div>
  );
};

export default InProgress;

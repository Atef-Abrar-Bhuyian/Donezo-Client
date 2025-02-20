import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useWebSocket = (userEmail) => {
  const [tasks, setTasks] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    // Fetch tasks from API
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/tasks?userEmail=${userEmail}`
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    const socket = new WebSocket(`ws://localhost:5000`);

    socket.onopen = () => {
      console.log("WebSocket Connected");
      socket.send(JSON.stringify({ type: "REGISTER", userId: userEmail }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "TASKS_UPDATED") {
        fetchTasks(); 
      }

      if (data.type === "TASK_ADDED") {
        toast.success("New task added!");
        setTasks((prevTasks) => [...prevTasks, data?.task]);
      }

      if (data.type === "TASK_DELETED") {
        if (!data.taskId) {
          toast.error("Failed! Please Try Again Later!");
          return;
        }
      
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== data.taskId));
        toast.success("Task deleted successfully!");
      }
    };

    socket.onclose = () => console.log("WebSocket Disconnected");
    setWs(socket);

    return () => {
      socket.close();
    };
  }, [userEmail]);

  return { tasks, setTasks, ws };
};

export default useWebSocket;

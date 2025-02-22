import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const useWebSocket = (userEmail) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!userEmail) {
      setIsLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://donezo-server-six.vercel.app/tasks?userEmail=${userEmail}`
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        // console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();

    const socket = new WebSocket(`ws://localhost:5000`);

    socket.onopen = () => {
      // console.log("WebSocket Connected");
      socket.send(JSON.stringify({ type: "REGISTER", userId: userEmail }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("WebSocket Message Received:", data); // Debug log
      switch (data.type) {
        case "TASKS_UPDATED":
          fetchTasks();
          break;
        case "TASK_ADDED":
          // console.log("Adding new task:", data.task); // Debug log
          toast.success("New task added!");
          setTasks((prevTasks) => {
            if (prevTasks.some((task) => task._id === data.task._id)) {
              return prevTasks; // Avoid duplicates
            }
            return [...prevTasks, data.task];
          });
          break;
        case "TASK_UPDATED":
          if (!data.task) {
            toast.error("Failed to update task!");
            return;
          }
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === data.task._id ? data.task : task
            )
          );
          toast.success("Task updated successfully!");
          break;
        case "TASK_DELETED":
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== data.taskId)
          );
          toast.success("Task deleted successfully!");
          break;
        case "ERROR":
          toast.error(data.message || "An error occurred");
          break;
        default:
          // console.log("Unknown message type:", data.type);
      }
    };

    socket.onclose = () => {
      // console.log("WebSocket Disconnected");
    };

    socket.onerror = (error) => {
      // console.error("WebSocket Error:", error);
    };

    wsRef.current = socket;

    return () => {
      socket.close();
    };
  }, [userEmail]);

  return { tasks, setTasks, ws: wsRef.current, isLoading };
};

export default useWebSocket;
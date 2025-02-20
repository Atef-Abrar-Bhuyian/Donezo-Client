import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useWebSocket = (userEmail) => {
  const [tasks, setTasks] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    const socket = new WebSocket(`ws://localhost:5000`);

    socket.onopen = () => {
      console.log("WebSocket Connected");
      socket.send(JSON.stringify({ type: "REGISTER", userId: userEmail }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "TASKS_UPDATED") {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === data.task._id ? data.task : task
          )
        );
        toast.success("Task updated successfully!");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      toast.error("WebSocket encountered an error.");
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      setTimeout(() => {
        setWs(new WebSocket(`ws://localhost:5000`)); 
      }, 3000);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [userEmail]);

  return { tasks, setTasks, ws };
};

export default useWebSocket;

// TaskContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No JWT token found in local storage.');
        return;
      }

      try {
        const response = await axios.get('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/task', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTasks(response.data);
        console.log(response.data, 'response.data');
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
    const intervalId = setInterval(fetchTasks, 5000); // Polling every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TaskContext.Provider value={tasks}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
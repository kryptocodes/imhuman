// RewardsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const RewardsContext = createContext(null);

export const RewardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No JWT token found in local storage.');
        return;
      }

      try {
        const response = await axios.get('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/reward', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRewards(response.data);
        console.log(response.data, 'response.data');
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
      }
    };

    fetchRewards();
    const intervalId = setInterval(fetchRewards, 5000); // Polling every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <RewardsContext.Provider value={rewards}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => useContext(RewardsContext);
// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const UserContext = createContext(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is stored with this key
      if (!token) {
        console.log('No JWT token found in local storage.');
        return; // Exit if no token is found
      }

      try {
        const response = await axios.get('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/user', {
          headers: {
            'Authorization': `Bearer ${token}` // Assuming the API expects a Bearer token
          }
        });
        setUser(response.data);
        
      } catch (error) {
        toast('Failed to fetch user');
      }
    };

    fetchUser();
    const intervalId = setInterval(fetchUser, 5000); // Polling every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
// UserContext.js
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuth:false,
  useAuth:()=>{},
});

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      // Check if a token exists in local storage
      const token = localStorage.getItem('token');
  
      if (token) {
        // Make a request to your authentication endpoint to verify the token
        axios.get(`http://localhost:4000/api/v1/appartement/${localStorage.getItem('token')}`,{
          params:{
            token:token
          }
        })
          
          .then((response) => {
            if (response.data) {
              setIsAuth(true);
            } else {
              setIsAuth(false);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.log('error',error)
            console.error('Error verifying token:', error);
            setIsAuth(false);
            setIsLoading(false);
          });
      } else {
        setIsAuth(false);
        setIsLoading(false);
      }
    }, []);
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth,useAuth }}>
      {children}
    </AuthContext.Provider>
  );
}


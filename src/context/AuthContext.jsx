import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import { registerUser, authenticateUser, getUser } from '../api/userApi';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
   const [loader, setLoader] = useState(false);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const navigate = useNavigate();

   const handleRegister = async ({ email, password, confirmPassword }) => {
      setLoader(true);

      if (!email || !password || !confirmPassword) {
         toast.error('Please fill all the fields');
         setLoader(false);
         return;
      }

      if (password !== confirmPassword) {
         toast.error('Passwords do not match');
         setLoader(false);
         return;
      }

      if (password.length < 8) {
         toast.error('Password must be atleast 8 characters long');
         setLoader(false);
         return;
      }

      let { result, msg } = await registerUser({ email, password });

      if (result) {
         toast.success(msg);
      } else {
         toast.error(msg);
      }

      setLoader(false);
   };

   const handleLogin = async ({ email, password }) => {
      setLoader(true);

      if (!email || !password) {
         toast.error('Please fill all the fields');
         setLoader(false);
         return;
      }

      let { result, msg } = await authenticateUser({ email, password });

      if (result) {
         toast.success(msg);
      } else {
         toast.error(msg);
      }

      setLoader(false);
   };

   const handleLogout = async () => {
      setLoader(true);
      Cookies.remove('token');
      toast.success('Logged out successfully');
      setIsAuthenticated(false);
   };

   useEffect(() => {
      const token = Cookies.get('token');

      if (token) {
         getUser().then((res) => {
            if (res.result) {
               setIsAuthenticated(true);
               console.log('User is authenticated');
            }
         });
      }
   }, []);

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            handleRegister,
            handleLogin,
            handleLogout,
            loader,
            setLoader,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

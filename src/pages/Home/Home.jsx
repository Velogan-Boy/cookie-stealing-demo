import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

import { AuthContext } from '../../context/AuthContext';

import styles from './Home.module.css';

const Home = () => {
   const { handleLogout, isAuthenticated, user } = useContext(AuthContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate('/login');
      }
   }, [isAuthenticated]);

   console.log(user);

   return (
      <div className={styles.pageContainer}>
         <h1 className={styles.title}>Eureka !</h1>
         <h2 className={styles.subtitle}>{user}</h2>
         <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
         </button>

         <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
   );
};

export default Home;

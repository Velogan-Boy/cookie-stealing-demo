import api from './axios';

import Cookies from 'js-cookie';

const route = 'user';

export const getUser = async () => {
   try {
      let {
         data: { message, user },
      } = await api.get(`${route}`, {
         headers: {
            tokenstring: Cookies.get('token'),
         },
      });

      return { result: true, msg: message, user };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const registerUser = async ({ email, password }) => {
   try {
      let {
         data: { message, token , user},
      } = await api.post(`${route}/register`, {
         email: email,
         password: password,
      });

      Cookies.set('token', token);

      return { result: true, msg: message, token, user };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const authenticateUser = async ({ email, password }) => {
   try {
      let {
         data: { message, token },
      } = await api.post(`${route}/authenticate`, {
         email: email,
         password: password,
      });

      Cookies.set('token', token);

      return { result: true, msg: message, token };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};



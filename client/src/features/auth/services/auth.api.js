// for communication with the backend
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredential: true
})

// register user
export async function register({ username, email, password }) {
  try {
    const response = await axios.post(
      '/api/auth/register',
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// login user
export async function login({ email, password }) {
  try {
    const response = await axios.post(
      '/api/auth/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//logout user
export async function logout() {
  try {
    const response = await axios.get('/api/auth/logout');
    return response.data;
  } catch (err) {
    console.log(err);
  }
}


export async function getMe() {
  try {
    const response = await axios.get('/api/auth/get-me');

    return response.data;
  }
  catch (err) {
    console.log(err);
  }
}
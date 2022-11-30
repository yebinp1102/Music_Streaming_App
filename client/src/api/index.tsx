import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

// API.interceptors.request.use((req) => {
//   if(localStorage.getItem('profile')){
//     // Bearer means Bearer token which releated with jwt. however... wtf is Bearer token?
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }
//   return req;
// })

interface FormData {
  username: string,
  password: string,
  confirmPassword : string
}

// auth
export const registerAPI = (formData: FormData) => API.post('/api/auth/register', formData)


// album
export const fetchAlbums = () => axios.get('/api/album');
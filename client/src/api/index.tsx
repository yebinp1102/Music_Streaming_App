import axios from 'axios';
import {Album} from '../redux/interfaces/Album'

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
export const fetchAlbums = () => API.get('/api/albums');
export const createAlbum = (newAlbum : Album) => API.post('/api/albums/createAlbum', newAlbum);
export const updateAlbum = (id:string, updatedAlbum: Album) => API.patch(`/api/albums/${id}`, updatedAlbum)
export const deleteAlbum = (id: string) => API.delete(`/api/albums/${id}`)
export const likeAlbum = (id: string) => API.patch(`/api/albums/${id}/likeAlbum`);
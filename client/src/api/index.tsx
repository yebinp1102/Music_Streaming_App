import axios from 'axios';
import {Album} from '../redux/interfaces/Album'

const API = axios.create({baseURL: 'http://localhost:5000'})

// api 요청을 보내기 전애 실행된다. 
// 토큰을 백엔드에 보내야 하며, 백엔드의 미들웨어는 토큰을 통해 실제 로그인 여부를 확인한다.
API.interceptors.request.use((req) => {
  // 로컬스토리지의 profile에 값이 있다면 토큰도 존재한다는 의미.
  if(localStorage.getItem('profile')){
    const accessToken = JSON.parse(localStorage.getItem('profile') || '{}')?.data?.token
    req.headers!.Authorization = `Bearer ${accessToken}`;
  }
  return req;
})

interface FormData {
  username: string,
  password: string,
  confirmPassword ?: string
}

interface CommentInfo{
  finalComment: string,
  id: string
}

// auth
export const registerAPI = (formData: FormData) => API.post('/api/auth/register', formData)
export const loginAPI = (formData : FormData) => API.post('/api/auth/login', formData)


// album
export const fetchAlbums = (page: number) => API.get(`/api/albums?page=${page}`);
export const fetchAlbum = (id: string) => API.get(`/api/albums/${id}`);
export const createAlbum = (newAlbum : Album) => API.post('/api/albums/createAlbum', newAlbum);
export const updateAlbum = (id:string, updatedAlbum: Album) => API.patch(`/api/albums/${id}`, updatedAlbum)
export const deleteAlbum = (id: string) => API.delete(`/api/albums/${id}`)
export const likeAlbum = (id: string) => API.patch(`/api/albums/${id}/likeAlbum`);
export const fetchAlbumsBySearch = (search : string) => API.get(`/api/albums/search/${search}`)
export const fetchAlbumsByTags = (tags: string) => API.get(`/api/albums/searchTags?tags=${tags}`)
export const comment = (comment: string, id : string) => API.post(`/api/albums/${id}/comment`, {comment})
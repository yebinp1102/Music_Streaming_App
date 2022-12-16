import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import * as api from '../api'
import {Album} from '../redux/interfaces/Album'


// Action Creators : 백엔드에서 데이터를 가져오는 과정
export const getAlbums = createAsyncThunk<Album[]>(
  "albums/getAlbums",
  async(_, thunkAPI) => {
    try{
      const {data} = await api.fetchAlbums();
      // console.log('data :', data)
      return data
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const createAlbum = createAsyncThunk<Album, any>(
  "albums/createAlbum",
  async(album, thunkAPI) => {
    try{
      const {data} = await api.createAlbum(album);
      console.log('data :',data);
      alert('앨범이 등록 되었습니다.')
      return data
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// state 초기값
interface AlbumState {
  albums: Album[] | null;
  singleAlbum: Album | null
  errors: any
}

const initialState: AlbumState = {
  albums: [],
  singleAlbum: null,
  errors: null,
}

// Reducer : action과 action의 수행 결과에 따라 특정 state를 변경함.
export const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setAlbums : (state, action:PayloadAction<Album[]>) => {
      state.albums = action.payload
    },
    addAlbum : (state, action:PayloadAction<Album>) => {
      state.albums?.push(action.payload)
    },
    // filterAlbum : (state, action) => {
    //   state.albums = state.albums?.filter(album => album._id != action.payload)!
    // }
  },
  // extraReducer는 프로미스의 진행 상태에 따라서 실행되는 리듀서 입니다.
  extraReducers: (builder) => {
  //   // getAlbums Action Creator's Result
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.albums = action.payload
    });
    builder.addCase(getAlbums.rejected, (state, action) => {
      state.errors = action.payload
    });
  //   builder.addCase(createAlbum.fulfilled, (state, action) => {
  //     state.push(action.payload);
  //   })  
  //   builder.addCase(createAlbum.rejected, (state, action) => {
  //     state = action.payload
  //   })
  }
})

export const {setAlbums, addAlbum} = albumSlice.actions;

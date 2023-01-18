import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from '../api'
import {Album} from '../redux/interfaces/Album'


// Action Creators : 백엔드에서 데이터를 가져오는 과정
export const getAlbums = createAsyncThunk(
  "albums/getAlbums",
  async(page:number, thunkAPI) => {
    try{
      const {data} = await api.fetchAlbums(page);
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
      alert('앨범이 등록 되었습니다.')
      return data
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

type albumInfoType = {
  currentId: string,
  albumData : Album
}

export const updateAlbum = createAsyncThunk(
  "albums/updateAlbum",
  async(albumInfo : albumInfoType , thunkAPI) => {
    const {currentId, albumData} = albumInfo
    try{
      const {data} = await api.updateAlbum(currentId, albumData);
      alert('앨범 정보가 수정 되었습니다.')
      return data
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const deleteAlbum = createAsyncThunk(
  "albums/deleteAlbum",
  async(id : string, thunkAPI) => {
    try{
      await api.deleteAlbum(id);
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const likeAlbum = createAsyncThunk(
  "albums/likeAlbum",
  async(id: string, thunkAPI) => {
    try{
      const {data} = await api.likeAlbum(id)
      return data;
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const getAlbumBySearch = createAsyncThunk(
  "albums/getAlbumBySearch",
  async(searchQuery: string, thunkAPI) => {
    try{
      const {data} = await api.fetchAlbumsBySearch(searchQuery);
      return data;
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// state 초기값
interface AlbumState {
  albums: Album[] | null;
  currentPage: number;
  numberOfPage: number;
  singleAlbum: Album | null;
  errors: any;
  isLoading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  currentPage: 1,
  numberOfPage: 1,
  singleAlbum: null,
  isLoading: true,
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
    }
  },
  // extraReducer는 프로미스의 진행 상태에 따라서 실행되는 리듀서 입니다.
  extraReducers: (builder) => {
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.isLoading = true
      state.albums = action.payload.data;
      state.currentPage = action.payload.currentPage
      state.numberOfPage = action.payload.numberOfPage
      state.isLoading = false
    });
    builder.addCase(getAlbums.rejected, (state, action) => {
      state.errors = action.payload
    });
    builder.addCase(createAlbum.fulfilled, (state, action) => {
      state.isLoading = true
      state.albums?.push(action.payload)
      state.isLoading = false;
    })  
    builder.addCase(createAlbum.rejected, (state, action) => {
      state.errors = action.payload
    })
    builder.addCase(updateAlbum.fulfilled, (state, action) => {
      state.albums?.map((album) => album._id === action.payload._id ? action.payload : album)
    })
    builder.addCase(deleteAlbum.fulfilled, (state, action) => {
      state.albums?.filter((album) => album._id !== action.payload);
    })
    builder.addCase(deleteAlbum.rejected, (state, action) => {
      state.errors = action.payload
    })
    builder.addCase(likeAlbum.fulfilled, (state, action) => {
      state.albums?.map((album) => album._id === action.payload._id ? action.payload : album)
    })
    builder.addCase(likeAlbum.rejected, (state, action) => {
      state.errors = action.payload
    })
    builder.addCase(getAlbumBySearch.fulfilled, (state, action) => {
      state.isLoading = true
      state.albums = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAlbumBySearch.rejected, (state, action) => {
      state.errors = action.payload
    })
  }
})

export const {setAlbums, addAlbum} = albumSlice.actions;

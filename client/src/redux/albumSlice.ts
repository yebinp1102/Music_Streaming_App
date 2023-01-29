import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from '../api'
import {Album} from '../redux/interfaces/Album'


// Home 컴포넌트에서 모든 앨범 정보를 가져올 때 사용하는 API
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

// AlbumDetail 페이지(컴포넌트)에서 특정 앨범 정보 하나만 가져올 때 사용하는 API
export const getAlbum = createAsyncThunk(
  "albums/getAlbum",
  async(id: string, thunkAPI) => {
    try{
      const {data} = await api.fetchAlbum(id);
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
  async(search :string, thunkAPI) => {
    try{
      const {data} = await api.fetchAlbumsBySearch(search);
      console.log(data);
      return data;
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const getRecommendation = createAsyncThunk(
  "albums/getRecommendation",
  async(genre: string, thunkAPI) => {
    try{
      const {data} = await api.fetchRecommendation(genre)
      return data;
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)


type commentInfoType = {
  finalComment: string,
  id : string
}

// 댓글
export const postComment = createAsyncThunk(
  "albums/postComment",
  async({finalComment, id} : commentInfoType, thunkAPI) => {
    try{
      const {data} = await api.comment(finalComment, id)
      return data
    }catch(err){
      return thunkAPI.rejectWithValue(err)
    }
  }
)


// state 초기값
interface AlbumState {
  albums: Album[] | null;
  album: Album | null,
  recommendation : Album[]
  currentPage: number;
  numberOfPage: number;
  errors: any;
  isLoading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  album: null,
  recommendation : [],
  currentPage: 1,
  numberOfPage: 1,
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
      state.albums = action.payload.data;
      state.currentPage = action.payload.currentPage
      state.numberOfPage = action.payload.numberOfPage
      state.isLoading = false
    });
    builder.addCase(getAlbums.rejected, (state, action) => {
      state.errors = action.payload
    });
    builder.addCase(getAlbum.fulfilled, (state, action) => {
      state.album = action.payload
      state.isLoading = false;
    })
    builder.addCase(getAlbum.rejected, (state, action) => {
      state.errors = action.payload
    })
    builder.addCase(createAlbum.fulfilled, (state, action) => {
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
      state.isLoading = true;
      state.albums = action.payload
      state.isLoading = false;
    })
    builder.addCase(getAlbumBySearch.rejected, (state, action) => {
      state.errors = action.payload
    })
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.album = action.payload;
    })
    builder.addCase(postComment.rejected, (state, action) => {
      state.errors = action.payload
    })
    builder.addCase(getRecommendation.fulfilled, (state, action) => {
      state.recommendation = action.payload;
    })
    builder.addCase(getRecommendation.rejected, (state, action) => {
      state.errors = action.payload
    })
  }
})

export const {setAlbums, addAlbum} = albumSlice.actions;

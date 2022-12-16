import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {configureStore} from '@reduxjs/toolkit'
import { albumSlice } from "./albumSlice";

// export const store = configureStore({
//   reducer: {
//     albums: albumsReducer
//   }
// })

export const store = configureStore({
  reducer: {
    album: albumSlice.reducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
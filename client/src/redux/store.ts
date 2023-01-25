import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { albumSlice } from "./albumSlice";

// export const store = configureStore({
//   reducer: {
//     albums: albumsReducer
//   }
// })

export const store = configureStore({
  reducer: {
    album: albumSlice.reducer
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})


export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
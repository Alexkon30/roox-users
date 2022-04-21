import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import userInfoReducer from './userInfoSlice'


export const store = configureStore({
  reducer: {
    usersReducer,
    userInfoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

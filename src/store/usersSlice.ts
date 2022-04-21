import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { delay } from '../utils';
import { User, UsersState } from './types';

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  sortedBy: 'name',
};

//thunk для загрузки пользователей
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/'
      );

      //искусственная задержка при загрузке, мс
      await delay(1000);

      return (await response.json()) as User[];
    } catch (e) {
      thunkApi.rejectWithValue('Не удалось загрузить данные');
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSortByName: (state) => {
      state.sortedBy = 'name';
    },
    setSortByCity: (state) => {
      state.sortedBy = 'city';
    },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.payload;
    },
  },
});

export const {
  setSortByName,
  setSortByCity,
} = usersSlice.actions;

export default usersSlice.reducer;

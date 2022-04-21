import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo, UserInfoState } from './types';
import { delay } from '../utils';

const initialState: UserInfoState = {
  currentUser: {} as UserInfo,
  isLoading: false,
  error: null,
  validateStats: {
    isValidName: true,
    isValidUsername: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidWebsite: true,
    isValidStreet: true,
    isValidCity: true,
    isValidCode: true,
  },
};

//thunk для загрузки пользователя по id
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id: string | undefined, thunkApi) => {
    if (!id) thunkApi.rejectWithValue('Ошибка загрузки');
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      //искусственная задержка при загрузке, мс
      await delay(1000);

      return (await response.json()) as UserInfo;
    } catch (e) {
      thunkApi.rejectWithValue('Не удалось загрузить данные');
    }
  }
);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidName = true;
      state.currentUser.name = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidUsername = true;
      state.currentUser.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidEmail = true;
      state.currentUser.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidPhone = true;
      state.currentUser.phone = action.payload;
    },
    setWebsite: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidWebsite = true;
      state.currentUser.website = action.payload;
    },
    setStreet: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidStreet = true;
      state.currentUser.address.street = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidCity = true;
      state.currentUser.address.city = action.payload;
    },
    setZipcode: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidCode = true;
      state.currentUser.address.zipcode = action.payload;
    },

    checkUser: (state, action: PayloadAction<string>) => {
      state.validateStats.isValidName = state.currentUser.name.length >= 4;
      state.validateStats.isValidUsername =
        state.currentUser.username.length >= 4;
      state.validateStats.isValidEmail = state.currentUser.email.length >= 4;
      state.validateStats.isValidPhone = state.currentUser.phone.length >= 4;
      state.validateStats.isValidWebsite =
        state.currentUser.website.length >= 4;
      state.validateStats.isValidCity =
        state.currentUser.address.city.length >= 4;
      state.validateStats.isValidStreet =
        state.currentUser.address.street.length >= 4;
      state.validateStats.isValidCode =
        state.currentUser.address.zipcode.length >= 4;

        //проверка на то, все ли поля валидны
        //если все, то "отправляем" данные
      if (
        state.validateStats.isValidName &&
        state.validateStats.isValidUsername &&
        state.validateStats.isValidEmail &&
        state.validateStats.isValidPhone &&
        state.validateStats.isValidWebsite &&
        state.validateStats.isValidCity &&
        state.validateStats.isValidStreet &&
        state.validateStats.isValidCode
      ) {
        //пересоздаем объект т.к. внутри currentUser
        //данных больше, чем нужно
        console.log({
          name: state.currentUser.name,
          username: state.currentUser.username,
          email: state.currentUser.email,
          address: {
            street: state.currentUser.address.street,
            city: state.currentUser.address.city,
            zipcode: state.currentUser.address.zipcode,
          },
          phone: state.currentUser.phone,
          website: state.currentUser.website,
          comment: action.payload,
        });
      }
    },
  },
  extraReducers: {
    [fetchUserById.pending.type]: (state) => {
      state.currentUser = {} as UserInfo;
      state.isLoading = true;
      state.error = null;
    },
    [fetchUserById.fulfilled.type]: (
      state,
      action: PayloadAction<UserInfo>
    ) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    [fetchUserById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.currentUser = {} as UserInfo;
      state.error = action.payload;
    },
  },
});

export const {
  setName,
  setUsername,
  setEmail,
  setCity,
  setPhone,
  setStreet,
  setWebsite,
  setZipcode,
  checkUser,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;

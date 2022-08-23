import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  password: null,
  phone: null,
  cnic: null,
  isLoggedIn: false,
  isLoading: true,
  isConnected: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email, password, phone, cnic } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      state.phone = phone;
      state.cnic = cnic;
      state.isLoggedIn = true;
    },

    removeUser: (state) => {
      state.name = null;
      state.email = null;
      state.password = null;
      state.phone = null;
      state.isLoggedIn = false;
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  setUser,
  removeUser,
  setIsLoggedIn,
  setIsConnected,
  setIsLoading,
} = userSlice.actions;

export default userSlice.reducer;

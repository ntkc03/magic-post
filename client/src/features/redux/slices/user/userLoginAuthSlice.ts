import { createSlice } from "@reduxjs/toolkit";

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userAuthState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userAuthState", serializedState);
  } catch (err) {
    // Handle errors
  }
};

const userLoginAuthSlice = createSlice({
  name: 'user-auth',
  initialState: loadState() || {
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      saveState(state); // Save state to localStorage on login
    },
    logout: (state) => {
      state.isLoggedIn = false;
      saveState(state); // Save state to localStorage on logout
    }
  }
});

export const { loginSuccess, logout } = userLoginAuthSlice.actions;
export default userLoginAuthSlice.reducer;
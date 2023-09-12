import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  firstName: undefined,
  lastName: undefined,
  _id: undefined,
  userType: localStorage.getItem("userType") || undefined,
  pairedCoach: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      state.userType = undefined;
    },
    setFirstName(state, action) {
      const payload = action.payload;
      state.firstName = payload;
    },
    setLastName(state, action) {
      const payload = action.payload;
      state.lastName = payload;
    },
    setUserLeader(state) {
      if (state.loggedIn) {
        state.userType = "leader";
        localStorage.setItem("userType", "leader");
      }
    },
    setUserCoach(state) {
      if (state.loggedIn) {
        state.userType = "coach";
        localStorage.setItem("userType", "coach");
      }
    },
    setUserAdmin(state) {
      if (state.loggedIn) {
        state.userType = "admin";
        localStorage.setItem("userType", "admin");
      }
    },
    setUserId(state, action) {
      const payload = action.payload;
      if (payload) {
        state._id = payload;
      }
    },
    setPairedCoach(state, action) {
      // action is an object, payload is the data
      const payload = action.payload;
      state.pairedCoach = payload;
    },
  },
});

export default userSlice.reducer;

export const {
  login,
  logout,
  setFirstName,
  setLastName,
  setUserCoach,
  setUserLeader,
  setUserAdmin,
  setName,
  setPairedCoach,
  setUserId,
} = userSlice.actions;

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, setUserCoach, setUserLeader } from "Reducers/UserSlice";

const Redux = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(data);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dispatch(login());
        }}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(setUserCoach());
        }}
      >
        Set To Coach
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(setUserLeader());
        }}
      >
        Set To Leader
      </button>
    </>
  );
};

export default Redux;

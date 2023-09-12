import React from "react";
import { useSelector } from "react-redux";
import Coach from  "./Coach"
import Password from "./Password"

/**
 *
 * @returns {JSX} - JSX representing Settings page
 */
const Settings = () => {

  const userData = useSelector((state) => state.user);

  return (
    <>
    <Password userType={userData.userType} />
    {userData.userType === "coach" && <Coach />}
    </>
  );
};

export default Settings;

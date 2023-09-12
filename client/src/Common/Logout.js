/**
 *
 * @returns {Object} - object with success flag indicating logout status
 */
const logout = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
};

/**
 *
 * @returns {boolean} - flag to indicate valid logout
 */
const logoutUser = async () => {
  const res = await logout();
  if (res.success) {
    return true;
  } else {
    console.log("Failed to log user out!");
    return false;
  }
};

export default logoutUser;

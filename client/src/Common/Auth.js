/**
 *
 * @returns {Object} - response from backend with valid flag
 */
const validateUser = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/validate/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
};

/**
 *
 * @returns {boolean} - flag to indicate valid credentials
 */
const validate = async () => {
  const res = await validateUser();
  if (res.valid) {
    return res;
  } else {
    return false;
  }
};

export default validate;

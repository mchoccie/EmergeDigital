/**
 * Calls api to retrieve user details
 * @returns {Object} - the user details from db
 */
async function getUser(type) {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/" + type + "/details",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());
}

/**
 * Gets user first and last name from db
 * @returns {Object} - user first and last name from db
 */
async function getUserName(type) {
  const user = await getUser(type);
  console.log("user:", user);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export { getUserName };

import { getLeader } from "Common/Fetch";

/**
 * Gets user info from db
 * @returns user info from db
 */
async function getUserInfo() {
  const user = await getLeader();
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

export { getUserInfo };

// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

/**
 * This page should call the backend and fetch user data, then store the important bits in redux
 */
const UserData = () => {
  // Call get user details
  const data = useSelector((state) => state.user);

  const getData = async () => {
    const user = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/" + data.userType + "/details",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
    console.log(user.firstName);
    // dispatch(setName({ firstName: user.firstName, lastName: user.lastName }));
    console.log(user);
  };
  getData();

  return (
    <>
      <h1>Show User Data</h1>
    </>
  );
};

export default UserData;

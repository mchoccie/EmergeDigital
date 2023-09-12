const getCoach = () => {
    
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/leader/coach", {
      method: "GET",
      credentials: "include",
      
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then((data) => data.json());
  }

  const detail = async() => {
    const res = await getCoach();
    
    
    return res;
  }

  export default detail;
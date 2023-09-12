/**
 * Updates details
 * @param {String} subgoal the name of the subgoal
 * @returns the response from the server
 */
async function updateDetail(attribute, value) {
    let body = {};
    body[attribute] = value;

    await fetch(process.env.REACT_APP_BACKEND_URL + "/api/coach/details", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

async function updatePassword(value, userType) {
    const body = {"password": value};
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/"+userType+"/updatepassword", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    console.log(res);
    return res.status === 201;
}

export {updateDetail, updatePassword}
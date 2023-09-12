/**
 * Calls api to retrieve user details
 * @returns {Object} - the user details from db
 */
async function getLeader() {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/leader/details", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

/**
 * Calls api to retrieve user's coach details
 * @returns the user's coach details from db
 */
async function getCoach() {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/leader/coach", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

async function getCoachName() {
  const coach = await getCoach();
  return {
    firstName: coach.firstName,
    lastName: coach.lastName,
  };
}

/**
 * Gets user goals and actions from db
 * @returns {Object} the user's goals and actions
 */
async function getGoalsActions() {
  const user = await getLeader();

  if (!user.leader) {
    return {
      subgoals: "",
    };
  }

  return {
    subgoals: user.leader.goals.subgoals,
  };
}

/**
 * Adds a subgoal
 * @param {String} subgoal - the name of the subgoal
 * @returns {Object} the response from the server
 */
async function addSubgoal(subgoal) {
  const body = {
    subgoal: subgoal,
  };

  await fetch(process.env.REACT_APP_BACKEND_URL + "/api/leader/subgoal", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 * Adds an action
 * @param {String} subgoal - name of the subgoal
 * @param {String} action - name of the action
 * @param {String} iterations - number of iterations
 */
async function addAction(subgoal, action, iterations) {
  const body = {
    subgoal: subgoal,
    action: {
      name: action,
      max_iterations: iterations,
    },
  };

  await fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/leader/subgoal/action",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
}

/**
 * Increments an action
 * @param {String} subgoal - name of subgoal
 * @param {String} action - name of action
 */
async function incrementAction(subgoal, action) {
  const body = {
    subgoal: subgoal,
    action: {
      name: action,
    },
  };

  await fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/leader/subgoal/action/increment",
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
}

/**
 * Decrements an action
 * @param {String} subgoal - name of subgoal
 * @param {String} action - name of action
 */
async function decrementAction(subgoal, action) {
  const body = {
    subgoal: subgoal,
    action: {
      name: action,
    },
  };

  await fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/leader/subgoal/action/decrement",
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
}

export {
  getCoach,
  getLeader,
  getCoachName,
  getGoalsActions,
  addAction,
  addSubgoal,
  incrementAction,
  decrementAction,
};

const initState = {
  email: "",
  fname: "",
  token: "",
  loggedInUserUID: "",
};

const authReducer = (state = initState, action) => {
  if (action.type === "login" || action.type === "logout") {
    return action.payload;
  }
  if (action.type === "USER_LOGGED_IN") {
    return { ...state, loggedInUserUID: action.payload.loggedInUserUID };
  }

  return state;
};

export default authReducer;

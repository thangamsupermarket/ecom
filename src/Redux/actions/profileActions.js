export const updateProfile = (profileInfo) => {
   console.log(profileInfo);
  return {
    type: "USER_PROFILE_UPDATE_ACTION",
    payload: {
      profileInfo,
    },
  };
};

export const removeProfile = () => {
  return {
    type: "USER_PROFILE_REMOVE_ACTION",
    payload: {},
  };
};

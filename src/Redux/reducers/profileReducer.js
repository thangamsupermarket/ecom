const initState = {
    profile: {}
}

const profileReducer = (state=initState, action) =>
{
    if(action.type === 'USER_PROFILE_UPDATE_ACTION')
    {
        return action.payload.profileInfo;
    }
    if(action.type === 'USER_PROFILE_REMOVE_ACTION')
    {
        return action.payload;
    }

    return state;
}

export default profileReducer;

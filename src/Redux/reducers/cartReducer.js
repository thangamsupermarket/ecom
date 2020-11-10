
const initState = {
    cart: []
}

const cartReducer = (state=initState, action) =>
{
    if(action.type === 'ADD_TO_CART')
    {
        return action.payload;
    }

    if(action.type === 'REMOVE_FROM_CART')
    {
        return [];
    }

    return state;
}

export default cartReducer;


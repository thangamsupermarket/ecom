
const initState = {
    cart: {}
}

const selectedProductReducer = (state=initState, action) =>
{
    if(action.type === 'SELECTED_PRODUCT')
    {
        return action.payload;
    }

    if(action.type === 'REMOVE_SELECTED_PRODUCT')
    {
        return {};
    }

    return state;
}

export default selectedProductReducer;


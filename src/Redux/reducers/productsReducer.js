
const initState = {
    products: []
}

const productsReducer = (state=initState, action) =>
{
    if(action.type === 'PRODUCTS_UPDATE_PRODUCTS')
    {
        return action.payload.products;
    }

    return state;
}

export default productsReducer;


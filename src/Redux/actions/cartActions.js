

export const addToCart = (cart, loggedInUserId) => {
    return {
        type: 'ADD_TO_CART',
        payload: {
            cart: cart
        }
    }
}

export const removeFromCart = (cart) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: {
            cart: cart
        }
    }
}
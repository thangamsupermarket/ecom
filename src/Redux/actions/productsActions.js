export const updateProducts = (products) => {
    return {
        type: 'PRODUCTS_UPDATE_PRODUCTS',
        payload: {
            products
        }
    }
}
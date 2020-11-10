export const selectedProduct = (product) => {
    return {
        type: 'SELECTED_PRODUCT',
        payload: {
            product: product
        }
    }
}

import authReducer from './authReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import selectedProductReducer from './selectedProductReducer';
import profileReducer from './profileReducer';
import productsReducer from './productsReducer';

const combinedReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    profile: profileReducer,
    selectedProduct: selectedProductReducer
});

export default combinedReducer
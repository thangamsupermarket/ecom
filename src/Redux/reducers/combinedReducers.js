import authReducer from './authReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import selectedProductReducer from './selectedProductReducer';

const combinedReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    selectedProduct: selectedProductReducer
});

export default combinedReducer
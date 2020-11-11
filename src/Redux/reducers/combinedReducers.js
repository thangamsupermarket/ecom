import authReducer from './authReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import selectedProductReducer from './selectedProductReducer';
import profileReducer from './profileReducer';

const combinedReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
    selectedProduct: selectedProductReducer
});

export default combinedReducer
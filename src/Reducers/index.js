import {combineReducers} from 'redux'
import ProductReducer from './ProductReducer'
import CartReducer from './CartReducer'
import UserReducer from './UserReducer'
import ProductCategoryReducer from './ProductCategoryReducer'
export default combineReducers({ProductReducer, CartReducer, UserReducer, ProductCategoryReducer})
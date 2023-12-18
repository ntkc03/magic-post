import { combineReducers } from 'redux';
import tokenReducer from '../slices/user/tokenSlice';
import userLoginAuthReducer from '../slices/user/userLoginAuthSlice';
import allConsolidationReducer from '../slices/user/allConsolidationSlice';
import allTransactionReducer from '../slices/user/allTransactionSlide';
import allEmployerReducer from '../slices/user/allEmployersSlide';
import deleteEmployerRducer from '../slices/user/deleteEmployerSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  allConsolidation: allConsolidationReducer,
  allTransaction: allTransactionReducer,
  userAuth: userLoginAuthReducer,
  allEmployers: allEmployerReducer,
  deleteEmployers: deleteEmployerRducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from 'redux';
import tokenReducer from '../slices/user/tokenSlice';
import userLoginAuthReducer from '../slices/user/userLoginAuthSlice';
import allConsolidationReducer from '../slices/user/allConsolidationSlice';
import allTransactionReducer from '../slices/user/allTransactionSlide';

const rootReducer = combineReducers({
  token: tokenReducer,
  allConsolidation: allConsolidationReducer,
  allTransaction: allTransactionReducer,
  userAuth: userLoginAuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

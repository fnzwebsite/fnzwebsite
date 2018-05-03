import initialState from './initialState';
import {FETCH_ACDACCOUNT_DATA,RECEIVE_ACDACCOUNT_DATA} from '../actions/allActions';

export default function acdAccountData(state = initialState.acdAccountData, action) {
    let newState;
    switch (action.type) {
      case FETCH_ACDACCOUNT_DATA:
            return action;
      case RECEIVE_ACDACCOUNT_DATA:
          newState = action.acdAccountData;
          return newState;
        default:
            return state;
    }
}

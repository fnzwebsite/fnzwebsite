import initialState from './initialState';
import {FETCH_ACDDEAL_DATA,RECEIVE_ACDDEAL_DATA} from '../actions/allActions';

export default function acdDealData(state = initialState.acdDealData, action) {
    let newState;
    switch (action.type) {
      case FETCH_ACDDEAL_DATA:
            return action;
      case RECEIVE_ACDDEAL_DATA:
          newState = action.acdDealData;
          return newState;
        default:
            return state;
    }
}

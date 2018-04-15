import initialState from './initialState';
import {FETCH_ACD_DATA,RECEIVE_ACD_DATA} from '../actions/allActions';

export default function acdData(state = initialState.acdData, action) {
    let newState;
    switch (action.type) {
      case FETCH_ACD_DATA:
            return action;
      case RECEIVE_ACD_DATA:
          newState = action.acdData;
          return newState;
        default:
            return state;
    }
}

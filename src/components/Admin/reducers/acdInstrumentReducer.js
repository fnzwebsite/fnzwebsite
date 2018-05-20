import initialState from './initialState';
import {FETCH_ACDINSTRUMENT_DATA,RECEIVE_ACDINSTRUMENT_DATA} from '../actions/allActions';

export default function acdInstrumentData(state = initialState.acdInstrumentData, action) {
    let newState;
    switch (action.type) {
      case FETCH_ACDINSTRUMENT_DATA:
            return action;
      case RECEIVE_ACDINSTRUMENT_DATA:
          newState = action.acdInstrumentData;
          return newState;
        default:
            return state;
    }
}

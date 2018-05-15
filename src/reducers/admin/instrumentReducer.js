import initialState from 'reducers/initialState';
import {FETCH_INSTRUMENT_DATA,RECEIVE_INSTRUMENT_DATA} from 'actions/allActions';

export default function instrumentData(state = initialState.instrumentData, action) {
    let newState;
    switch (action.type) {
      case FETCH_INSTRUMENT_DATA:
            return action;
      case RECEIVE_INSTRUMENT_DATA:
          newState = action.instrumentData;
          return newState;
        default:
            return state;
    }
}

import initialState from 'reducers/initialState';
import {FETCH_ORGANISATION_DATA,RECEIVE_ORGANISATION_DATA} from 'actions/allActions';

export default function organisationData(state = initialState.organisationData, action) {
    let newState;
    switch (action.type) {
      case FETCH_ORGANISATION_DATA:
            return action;
      case RECEIVE_ORGANISATION_DATA:
          newState = action.organisationData;
          return newState;
        default:
            return state;
    }
}

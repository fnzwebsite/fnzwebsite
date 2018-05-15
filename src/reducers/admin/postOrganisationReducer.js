import initialState from 'reducers/initialState';
import {FETCH_POSTORGANISATION_DATA, POST_ORGANISATION_DATA} from 'actions/allActions';

export default function postOrganisationData(state = initialState.postOrganisationData, action) {
    let newState;
    switch (action.type) {
        case FETCH_POSTORGANISATION_DATA:
            return action;
        case POST_ORGANISATION_DATA:
            newState = action.postOrganisationData;
            return newState;
        default:
            return state;
    }
};

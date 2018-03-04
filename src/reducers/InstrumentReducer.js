import initialState from './initialState';
import {FETCH_INSTRUMENT,RECEIVE_INSTRUMENT, FETCH_READ_PRICE,FETCH_READ_CSV,RECEIVE_READ_CSV, RECEIVE_READ_PRICE} from '../actions/allActions';

export default function instrument(state = initialState.instrument, action) {
    let newState;
    switch (action.type) {
        case FETCH_INSTRUMENT:
            return action;
        case RECEIVE_INSTRUMENT:
            newState = action.instrument;
            return newState;
        default:
            return state;
    }
}

export function readCsv(state = initialState.instrument, action) {
    let newState;
    switch (action.type) {
        case FETCH_READ_CSV:
            return action;
        case RECEIVE_READ_CSV:
            newState = action.instrument;
            return newState;
        default:
            return state;
    }
}

export function readPrice(state = initialState.instrument, action) {
    let newState;
    switch (action.type) {
        case FETCH_READ_PRICE:
            return action;
        case RECEIVE_READ_PRICE:
            newState = action.instrument;
            return newState;
        default:
            return state;
    }
}
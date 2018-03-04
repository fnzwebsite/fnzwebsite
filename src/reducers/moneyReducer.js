import * as types from '../actions/allActions'
const initialState = [];

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.MONEY_REQUEST:
      return state;
    case types.MONEY_SUCCESS:
      return action.money;
    case types.MONEY_FAILURE:
      return state;
    default:
      return state;
  }
}
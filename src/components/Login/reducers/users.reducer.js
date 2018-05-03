import * as allActions from '../../Admin/actions/allActions';

export function users(state = {}, action) {
  switch (action.type) {
    case allActions.LOGIN_REQUEST:
      return {
        loading: true
      };
    case allActions.LOGIN_SUCCESS:
      return {
        items: action.users
      };
    case allActions.LOGIN_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}
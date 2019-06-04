import { Actions } from "../actions/github.actions";
import GitHub from 'github-api'
export const INITIAL_GITHUB_STATE = {
    token: '',
    me: {}
}
  

export default (state, action) => {
    switch (action.type) {
      case Actions.SET_GITHUB_TOKEN:
        localStorage.setItem('GITHUB_TOKEN', action.token)
        return {
            ...state,
            token: action.token
        };
      case Actions.RESUME_GITHUB_TOKEN:
        return {
            ...state,
            token:localStorage.getItem('GITHUB_TOKEN')
        }
      case Actions.INIT_GITHUB_API:
      const gh = new GitHub({
          token: state.token
      });
      return {
          ...state,
          me: gh.getUser()
      }
      default:
        return {...state};
    }
  };
  
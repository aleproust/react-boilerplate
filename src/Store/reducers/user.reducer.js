
export const INITIAL_USER_STATE = {
    avatar: '',
    email:'',
    uid: '',
    accessToken: '',
    isAuthenticated: false
  }
  

export default (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
            ...state,
            ...action.user
        };
      case "LOGOUT":
        return {
            user: {...INITIAL_USER_STATE}
        }
      default:
        return {...INITIAL_USER_STATE};
    }
  };
  
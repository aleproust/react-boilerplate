
export const INITIAL_USER_STATE = {
    avatar: '',
    email:'',
    uid: '',
    accessToken: '',
    isAuthenticated: false,
    isLoaded: false,
  }
  

export default (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
            ...state,
            ...action.user,
            isLoaded: true,
        };
      case "LOGOUT":
        return {
            ...INITIAL_USER_STATE,
            isLoaded: true
        }
      default:
        return {...INITIAL_USER_STATE};
    }
  };
  
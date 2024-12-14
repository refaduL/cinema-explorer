export const authReducers = (authData, action) => {
  switch (action.type) {
      case "LOGIN_SUCCESS":
          return {
              ...authData,
              isAuthenticated: true,
              user: action.payload.user,
              token: action.payload.token,
              loading: false,
              error: null,
          };
      case "LOGOUT_SUCCESS":
          return {
              ...authData,
              isAuthenticated: false,
              user: null,
              token: null,
          };
      case "RESTORE_SESSION":
          return {
              ...authData,
              isAuthenticated: true,
              user: action.payload.user,
              token: action.payload.token,
              loading: false,
              error: null,
          };
      case "UPDATE_USER_INFO":
          return {
              ...authData,
              user: { ...authData.user, ...action.payload },
          };
      case "SET_LOADING":
          return {
              ...authData,
              loading: action.payload,
          };
      case "SET_ERROR":
          return {
              ...authData,
              error: action.payload,
              loading: false,
          };
      default:
          throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const userSlice = (state) => state.user;

export const isUserLogged = (state) => !!userSlice(state).current;
export const isLoginProgress = (state) => userSlice(state).fetching;
export const getLoginError = (state) => userSlice(state).error;

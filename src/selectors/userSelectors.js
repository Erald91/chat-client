export const userSlice = (state) => state.user;

export const isUserLogged = (state) => !!userSlice(state).current;

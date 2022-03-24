const { ThemePreference } = require("auth");

export const initialState = {
  darkMode: ThemePreference.theme(),
};

export const actionTypes = {
  SET_THEME_PREFERENCE: "SET_THEME_PREFERENCE",
};

const reducer = (currentState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_THEME_PREFERENCE:
      return {
        darkMode: action.payload,
      };
    default:
      return currentState;
  }
};

export default reducer;

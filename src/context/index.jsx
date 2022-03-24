import { createContext, useContext, useReducer } from "react";

const ThemeContext = createContext();

const Provider = ({ initialState, reducer, children }) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);

export default Provider;

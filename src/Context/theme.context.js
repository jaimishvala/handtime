import { useReducer } from "react";
import { ThemeReducer } from "./Reducer/context.reducer";
import { TOGGLE_THEME } from "./ActionTypes";
import { createContext } from "react";

const initVal = {
    theme: 'light'
}

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initVal);

    const toggleTheme = (val) => {

        let newTheme = val === 'light' ? 'dark' : 'light'
        console.log(newTheme);

        dispatch({ type: TOGGLE_THEME, payload: newTheme });
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )

}


export default ThemeContext;
import React, {ComponentProps, useState} from "react";
export const ThemeContext = React.createContext({
    darkMode: false,
    toggleDarkMode: () => {}
});

export const ThemeProvider = ({children}:ComponentProps<any>) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
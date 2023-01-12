import React, {ComponentProps, useEffect, useState} from "react";

export const ThemeContext = React.createContext({
    darkMode: false,
    toggleDarkMode: () => {}
});
export const ThemeProvider = ({children}:ComponentProps<any>) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme-dark-mode');
        if(saved) {
            return JSON.parse(saved)
        } else {
            return false
        }
    });

    useEffect(() => {
        localStorage.setItem('theme-dark-mode', JSON.stringify(darkMode));
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
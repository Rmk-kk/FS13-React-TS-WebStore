import React, {ComponentProps, useState} from "react";

// type ThemeType = 'light' | 'dark';
//
// export const THEME = {
//     light: {
//         '--primary': "#DDB57C",
//         '--secondary': "#043E85",
//         '--text': '#fafafa',
//         '--background': '#E9F3FF',
//     },
//     dark: {
//         '--primary': "#2c2c2c",
//         '--secondary': "#fafafa",
//         '--text': '#fafafa',
//         '--background': "#1E1E1E",
//     }
// };
//
// export interface Theme {
//     '--primary' : Color,
//     '--secondary' : Color,
//     '--background' : Color,
//     '--text' : Color,
//
// }
// interface ThemeContextPropsInterface {
//     themeType: ThemeType,
//     theme: Theme,
//     setCurrentTheme: () => void,
// }
// @ts-ignore
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
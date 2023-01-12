import './index.scss'
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './components/App/App';
import {ThemeProvider} from "./components/ThemeContext";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

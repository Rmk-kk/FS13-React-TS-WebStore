import './app.scss'
import '../Header/header.scss'

import React from 'react'

import Header from "../Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import UserContent from "../pages/UserPage/UserContentContainer/UserContent";
import AuthPage from "../pages/UserPage/AuthPage/AuthPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import ErrorImageComponent from "../ErrorImageComponent/ErrorImageComponent";
import {createTheme, Paper, ThemeProvider} from "@mui/material";



const App = () => {

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#043E85',
            }
        }
    })

  return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <Header/>
              <Paper>
              <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/category/:category' element={<CategoryPage/>}/> {/*CATEGORY PAGE*/}
                  <Route path='/cart'/>
                  <Route path='/account/login' element={<AuthPage/>}/>
                  <Route element={<ProtectedRoutes/>}>
                      <Route path='/account' element={<UserContent/>}/> {/*Account page*/}
                      <Route path='/checkout' element={<CheckoutPage/>}/>
                  </Route>
                  <Route path='category/:category/:id' element={<ProductPage/>}/>  {/*Product page*/}
                  <Route path={'*'} element={<ErrorImageComponent path='404'/>}/>
              </Routes>
              </Paper>
              <Footer/>
          </ThemeProvider>
      </BrowserRouter>
  )
}

export default App
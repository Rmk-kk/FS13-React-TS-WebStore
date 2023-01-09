import React from 'react'
import Header from "../Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import UserValidation from "../UserValidation/UserValidation";
import UserContent from "../pages/UserPage/UserContentContainer/UserContent";
import AuthPage from "../pages/UserPage/AuthPage/AuthPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import ErrorImageComponent from "../ErrorImageComponent/ErrorImageComponent";

const App = () => {
  return (
      <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/categories/:category' element={<CategoryPage/>}/> {/*CATEGORY PAGE*/}
                  <Route path='/categories/:category/:id' element={<ProductPage/>}/>  {/*Product page*/}
                  <Route path='/account/login' element={<AuthPage/>}/>
                  <Route element={<UserValidation/>}> {/*Validate user auth*/}
                      <Route path='/account' element={<UserContent/>}/> {/*Account page*/}
                      <Route path='/checkout' element={<CheckoutPage/>}/>
                  </Route>
                  <Route path={'*'} element={<ErrorImageComponent path='404'/>}/>
              </Routes>
              <Footer/>
      </BrowserRouter>
  )
}

export default App
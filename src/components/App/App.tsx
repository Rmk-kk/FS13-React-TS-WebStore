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

const App = () => {
  return (
      <BrowserRouter>
              <Header/>
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
              <Footer/>
      </BrowserRouter>
  )
}

export default App
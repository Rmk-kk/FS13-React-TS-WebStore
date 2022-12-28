import './app.scss'
import '../Header/header.scss'

import React, {useEffect} from 'react'

import Header from "../Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import LoginComponent from "../pages/UserPage/LoginComponent";
import ProtectedRoutes from "../pages/UserPage/ProtectedRoutes";
import UserContent from "../pages/UserPage/UserContent";




const App = () => {


  return (
      <BrowserRouter>
        <Header/>
          <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/category/:category' element={<CategoryPage/>}/> {/*CATEGORY PAGE*/}
              <Route path='/cart'/>
              <Route path='/account/login' element={<LoginComponent/>}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path='/account' element={<UserContent/>}/> {/*Account page*/}
              </Route>
              <Route path='category/:category/:id' element={<ProductPage/>}/>  {/*Product page*/}
          </Routes>
        <Footer/>
      </BrowserRouter>
  )
}

export default App
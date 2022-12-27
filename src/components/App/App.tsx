import './app.scss'
import '../Header/header.scss'

import React, {useEffect} from 'react'

import Header from "../Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductPage from "../pages/ProductPage/ProductPage";




const App = () => {


  return (
      <BrowserRouter>
        <Header/>
          <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/category/:category' element={<CategoryPage/>}/>
              <Route path='/cart'/>
              <Route path='/account/'/> {/*Account page*/}
              <Route path='category/:category/:id' element={<ProductPage/>}/>  {/*Product page*/}
          </Routes>
        <Footer/>
      </BrowserRouter>
  )
}

export default App
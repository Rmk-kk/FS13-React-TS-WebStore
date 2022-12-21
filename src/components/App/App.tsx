import './app.scss'

import React from 'react'

import Header from "../Header/Header";
import HomePage from "../pages/Home/HomePage";



const App = () => {
    // const [productList, setProductList] = useState([]);
    // const service = new StoreServices();
    //
    // useEffect(() => {
    //     // onListRequest();
    // })
    // //Loading list
    // const onListRequest = () => {
    //     service.fetchAll('https://api.escuelajs.co/api/v1/products')
    //         .then(data => setProductList(data))
    // }


  return (
      <>
        <Header/>
        <HomePage/>
      </>
  )
}

export default App
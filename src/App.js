import React, {useEffect, useState } from 'react'
import axios from "axios";
import ProductTable from './tables/ProductTable'


const App = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then(result => setProducts(result.data));
  }, []);

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add user</h2>
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <ProductTable products={products}/>
        </div>
      </div>
    </div>
  )
}
export default App;

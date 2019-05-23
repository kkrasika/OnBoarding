import React, { useEffect, useState } from 'react'
import axios from "axios"

const ProductTable = ()  => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then(result => setProducts(result.data));
  }, []);

      return (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.length > 0 ? (
        products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <button className="button muted-button">Edit</button>
              <button className="button muted-button">Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
      )
}

export default ProductTable
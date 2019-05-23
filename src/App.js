import React from 'react'
import ProductTable from './tables/ProductTable'
import AddProductForm from './forms/AddProductForm'


const App = () => {
  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add user</h2>
          <AddProductForm />
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <ProductTable/>
        </div>
      </div>
    </div>
  )
}
export default App;

import React from 'react'
import EmployeeTable from './tables/EmployeeTable'
import AddEmployeeForm from './forms/AddEmployeeForm'


const App = () => {
  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add user</h2>
          <AddEmployeeForm />
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <EmployeeTable/>
        </div>
      </div>
    </div>
  )
}
export default App;

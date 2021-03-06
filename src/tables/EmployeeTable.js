import React, { useEffect, useState } from 'react'
import axios from "axios"

const EmployeeTable = ()  => {

  const [employees, setEmployees] = useState([])

  var USER_TOKEN = localStorage.getItem('tokenval');
  const AuthStr = 'Bearer '.concat(USER_TOKEN); 
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/employees", { headers: { Authorization: AuthStr } })
      .then(result => setEmployees(result.data));
  }, []);

      return (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.length > 0 ? (
        employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.surname}</td>
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

export default EmployeeTable
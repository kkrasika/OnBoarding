import React, { useEffect, useState } from 'react'
import axios from "axios"

const EmployeeTable = ()  => {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/employees")
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
            <td>{employee.price}</td>
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
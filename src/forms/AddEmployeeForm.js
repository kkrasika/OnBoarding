import React, { useState } from 'react'
import axios from "axios"

const AddEmployeeForm = props => {

    const initialFormState = { id: null, name: '', surname: '' }
    const [employee, setEmployee] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target

        setEmployee({ ...employee, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log('Before Log');
        console.log(employee);

        axios.post('http://localhost:8080/api/v1/employees', employee )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

            setEmployee(initialFormState)
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label>Name</label>
            <input type="text" name="name" value={employee.name} onChange={handleInputChange} />
            <label>Surname</label>
            <input type="text" name="surname" value={employee.surname} onChange={handleInputChange} />
            <button>Add new employee</button>
        </form>
    )
}

export default AddEmployeeForm
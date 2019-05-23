import React, { useState } from 'react'
import axios from "axios"

const AddProductForm = props => {

    const initialFormState = { id: null, name: '', price: '' }
    const [product, setProduct] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target

        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log('Before Log');
        console.log(product);

        axios.post('http://localhost:8080/api/v1/products', product )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

            setProduct(initialFormState)
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label>Name</label>
            <input type="text" name="name" value={product.name} onChange={handleInputChange} />
            <label>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleInputChange} />
            <button>Add new product</button>
        </form>
    )
}

export default AddProductForm
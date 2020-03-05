import React, { Component } from 'react';
import axios from 'axios';

async function makePostRequest(userObject) {

	let res = await axios.post('http://localhost:3001/api/v1/addemp', userObject)
    .then((res) => {
        console.log(res.data)
    }).catch((error) => {
        console.log(error)
    });

	console.log("sent success")
}

class Profile extends Component {
	
	constructor(props) {
        super(props)

        this.onChangeName = this.onChangeUserName.bind(this);
        this.onChangeSurname = this.onChangeUserSurname.bind(this);
        this.onChangeAddress = this.onChangeUserAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            surname:'',
            address:''
        }
    }

    onChangeUserName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeUserSurname(e) {
        this.setState({ surname: e.target.value })
    }
	
    onChangeUserAddress(e) {
        this.setState({ address: e.target.value })
    }
	
	onSubmit(e) {
		console.log("going to submit")
		
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            surname: this.state.surname,
            address: this.state.address
        };

        makePostRequest(userObject)

        this.setState({ name: '', surname: '' , address: '' })
    }
	

	
  render() {
    return (
    	<div className="wrapper">
            <form onSubmit={this.onSubmit}>
		        <div className="form-group">
		            <label>Enter Name</label>
		            <input type="text" value={this.state.name} onChange={this.onChangeName} className="form-control" />
		        </div>
		        <div className="form-group">
		            <label>Enter Surname</label>
		            <input type="text" value={this.state.surname} onChange={this.onChangeSurname} className="form-control" />
		        </div>
		        <div className="form-group">
		            <label>Enter Address</label>
		            <input type="text" value={this.state.address} onChange={this.onChangeAddress} className="form-control" />
		        </div>
		        <div className="form-group">
		            <input type="submit" value="Create User" className="btn btn-success btn-block" />
		        </div>
            </form>
        </div>
    );
  }
}

export default Profile;
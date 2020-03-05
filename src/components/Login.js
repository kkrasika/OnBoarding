import React, { useEffect, useState, Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios"
import "../index.css";

const fakeAuth = {
		  isAuthenticated: false,
		  authenticate(cb) {
		    		    
	        const userObject = {
		            username: 'test',
		            password: 'test'
		        };
		    
		    axios.post('http://localhost:3001/api/v1/login', userObject)
		    .then((res) => {
		        console.log(res.data.token)
		        this.isAuthenticated = true
			    setTimeout(cb, 100)
		        localStorage.setItem('tokenval', res.data.token);
		    }).catch((error) => {
		        console.log(error)
		    });		    
		  },
		  signout(cb) {
		    this.isAuthenticated = false
		    localStorage.removeItem('tokenval');
		    setTimeout(cb, 100)
		  }
		}


class Login extends Component {
	login = () => {
	    fakeAuth.authenticate(() => {
	    	this.setState(() => ({
	            redirectToReferrer: true
	          }))
	    })
	  }
	  
	
	  state = {
				    redirectToReferrer: false
				  }
	  
	render() {
			  
			  const { redirectToReferrer } = this.state
			  
			    if (redirectToReferrer === true) {
			        return <Redirect to='/' />
			      }
		  return (
	    	<div>
	    	    <p>You must log in to view the page</p>
	    	    <button onClick={this.login}>Log in</button>
	    	  </div>
	    );

	  }
  
	}

export {Login, fakeAuth};
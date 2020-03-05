import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import AddEmployeeForm from './forms/AddEmployeeForm'
import EmployeeTable from './tables/EmployeeTable'
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import {Login, fakeAuth} from "./components/Login";

const PrivateRoute = ({ component: Component, ...rest }) => (
		  <Route {...rest} render={(props) => (
				  fakeAuth.isAuthenticated === true
		      ? <Component {...props} />
		      : <Redirect to='/login' />
		  )} />
		)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))
		
class App extends Component {
	  render() {
	    return (
	    <Router>
	        <div>
	          <h2>On Boarding</h2><AuthButton/>
	          <nav className="navbar navbar-expand-lg navbar-light bg-light">
	          <ul className="navbar-nav mr-auto">
	          	<li><Link to={'/EmployeeTable'} className="nav-link">Employees</Link></li>
	            <li><Link to={'/profile'} className="nav-link">Profile</Link></li>
	            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
	            <li><Link to={'/about'} className="nav-link">About</Link></li>
	          </ul>
	          </nav>
	          <hr />
	          <Switch>
	              <Route exact path='/' component={Login} />
	              <PrivateRoute path="/EmployeeTable" exact component={EmployeeTable} />
	              <PrivateRoute path="/profile" exact component={Profile} />
	              <PrivateRoute path='/contact' component={Contact} />
	              <Route path='/about' component={About} />
	              <Route path="/login" component={Login}/>
	          </Switch>
	        </div>
	      </Router>
	    );
	  }
	}

export default App;

import React, { Component } from 'react'
import { Route, withRouter, Link, Redirect } from 'react-router-dom'

let l = console.log


let auth = {
	isAuth: false,
	login(cb){
		l(this)
		this.isAuth = true
		setTimeout(cb, 1000)
	},
	logout(cb){
		this.isAuth = false
		setTimeout(cb, 1000)
	}
}

class App extends Component{
	render(){
		return(
			<div>
				<LogoutBtn />

				<ul>
					<li> <Link to="/public"> Public  </Link></li>
					<li> <Link to="/private"> Private </Link></li>
				</ul>

				<Route path='/public' component={Public} />
				<PrivateRoute path='/private' component={Private}/>
				<Route path='/login' component={Login}/>
			</div>
		)
	}
}



let LogoutBtn = () => {
	return (
		auth.isAuth && <button onClick={auth.logout}>logout</button>
	)	
}

let Login = () => (
	<button 
		onClick={() => { auth.login() } 
	}> Login </button>
)

let Public = () => ( <h3> Public </h3> )

let Private = () => ( <h3> Private </h3> )

let PrivateRoute = ({component: Component, ...rest}) => (
	<Route 
		{...rest}
		component={(props) => {
			return ( auth.isAuth ? <Component {...props}/> : <Redirect to={{pathname: '/login'}} /> )
		}}
	/>
)









export default App
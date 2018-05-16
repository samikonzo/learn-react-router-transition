import React, { Component } from 'react'
import { Route, withRouter, Link, Redirect } from 'react-router-dom'

let auth = {
	isAuth: false,
	login(cb){
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
					<li> <Link to="/public"/> Public </li>
					<li> <Link to="/private"/> Private </li>
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
	<button onClick={auth.login}> Login </button>
)

let Public = () => {}

let Private = () => {}

let PrivateRoute = ({component: Component, ...rest}) => (
	auth.isAuth ? 
		<Route path=>
		<Component {...rest}/> :
		<Redirect to={{path: '/login'}} />
)









export default App
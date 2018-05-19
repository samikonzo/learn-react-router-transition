import React, { Component } from 'react'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import Animated from './Animated.jsx'


let auth = {
	isAuth: false,
	login(cb){
		this.isAuth = true
		setTimeout(cb, 1000)
	},
	logout(cb){
		this.isAuth = false
		setTimeout(cb, 1000)
	},
}

class App extends Component{
	render = () => (
		<div> 
			<Header />
			<Nav />
			<Main />
		</div>
	)
}

let Header = () => {
	return (
		<div className='Header'>
			<h1> React Route </h1>

			
			{auth.isAuth && <Logout />}
		</div>
	)
}

let Nav = () => {
	return (
		<ul>
			<li> <Link to="/"> Home </Link> </li>
			<li> <Link to="/public"> Public </Link> </li>
			<li> <Link to="/private"> Private </Link> </li>
			<li> <Link to="/animated"> Animated </Link> </li> 
		</ul>
	)
}

let Main = () => (
	<div className="Main">
		<Route exact path='/' component={Home}/>
		<Route path='/public' component={Public}/> 
		<PrivateRoute path='/private' component={Private}/>
		<Route path='/login' component={Login}/>
		<Route path='/animated' component={Animated}/>
	</div>
)

let Home = () => (<h3>Home</h3>)
let Public = () => (<h3>Public</h3>)
let Private = () => (<h3>Private</h3>)

let PrivateRoute = ({ component: Component, ...rest }) => {

	return (
		<Route {...rest} component={(props) => {
			l(props)

			return ( auth.isAuth ? <Component /> : <Redirect to={{pathname: '/login', state: {from: props.location}}}/> )
		}} />
	)
}

class Login extends Component{
	state = {
		fromReferrer : false
	}

	login(){
		auth.login( () => { this.setState({ fromReferrer : true }) })
	}

	render(){

		let { from } = this.props.location.state.pathname || {from: '/'}
		let { fromReferrer } = this.state

		l(this.props)
		l(from)

		if( fromReferrer ) return <Redirect to={ {pathname: from} }/>

		return(
			<button onClick={() => { this.login() }}> Login </button>
		)
	}
}

let Logout = withRouter(({ history }) => {
	let logout = () => {
		auth.logout( () => {history.push('/')} )
	}

	return <button onClick={logout}> Logout </button>
})



export default App 
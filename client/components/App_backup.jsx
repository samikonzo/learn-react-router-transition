import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter} from 'react-router-dom'

let l = console.log


class App extends Component {
	render() {
		return (
			<div>

				<AuthButton />

				<div>
					<ul>
						<li>
							<Link to="/public"> Public Page </Link>
						</li>

						<li>
							<Link to="/private"> Private Page </Link>
						</li>

						<Route path="/public" component={Public} /> 
						<Route path="/login" component={Login} />
						<PrivateRoute path="/private" component={Private} />
					</ul>
				</div>

			</div>
		);
	}
}


const fakeAuth = {
	isAuthenticated : false,

	login(cb){
		this.isAuthenticated = true;
		setTimeout(cb, 1000)
	},

	logout(cb){
		this.isAuthenticated = false;
		setTimeout(cb, 1000)
	}
}

const AuthButton = withRouter(
	({ history }) => (
		fakeAuth.isAuthenticated ? 
			(
				<p>
					Welcome!{" "}
					<button 
						onClick={
							() => { fakeAuth.logout( () => {history.push('/')} )}
						}
					> 
						logout 
					</button>
				</p>
			) :	(
				<p> You are not logged in </p>
			)
	)	
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Public = () => <h3> Public </h3>
const Private = () => <h3> Private </h3>

class Login extends Component{
	constructor(props){
		super(props)

		this.state = {
			redirectedToReferrer: false
		}

		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
	}

	login(){
		fakeAuth.login(() => {
			this.setState({ redirectedToReferrer : true })
		});
	}

	logout(){

	}

	render(){
		let { from } = this.props.location.state || { from: { pathname : '/' }}
		let { redirectedToReferrer } = this.state

		if(redirectedToReferrer) return ( <Redirect to={from}/> )

		return(
			<div> 
				<p> Your must log in to view the page at {from.pathname}</p>
				<button onClick={this.login}> Login </button>
			</div>
		)
	}
}




export default App
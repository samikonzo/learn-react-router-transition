import React, { Component } from 'react'
import { Route, withRouter, Link, Redirect } from 'react-router-dom'

let l = console.log


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
					<li> <Link to="/public"> Public  </Link></li>
					<li> <Link to="/private"> Private </Link></li>
				</ul>

				<Route path='/public' component={Public} />
				<PrivateRoute path='/private' component={Private}/>
				<PrivateRoute path='/(private|lol-one|kek-two|foo-three|bar-four)/' component={PageChanger} paths={['lol-one', 'kek-two', 'foo-three', 'bar-four']}/>
				{/* <PageChanger paths={['lol-one', 'kek-two', 'foo-three', 'bar-four']} lastComponent={() => (<div> last component </div>)}/> */}
				<Route path='/login' component={Login}/>
			</div>
		)
	}
}



let LogoutBtn = withRouter(({ history }) => {
	return (
		auth.isAuth && <button onClick={() => { auth.logout(() => { history.push('/') }) }}>logout</button>
	)	
})

class Login extends Component{
	state = {
		redirected: false
	}

	login(){
		auth.login(() => {
			this.setState({
				redirected: true
			})
		})
	}

	setRedirectedToTrue(){
		
	}

	render(){
		let { from } = this.props.location.state || {from : '/'} 

		//l(from)

		if(this.state.redirected){ 
			return (<Redirect to={from} />)
		}

		return(
			<button 
				onClick={() => { this.login() } 
			}> 
				Login 
			</button>
		)
	}
}

let Public = () => ( <h3> Public </h3> )

let Private = () => ( <h3> Private </h3> )

let PrivateRoute = ({component: Component, ...rest}) => (
	<Route 
		{...rest}
		component={(props) => {

			let concatProps = {
				...props,
				...rest
			}


			//l(props)
			//l(rest)
			//l(concatProps)
			//l(' ')

			return ( auth.isAuth ? <Component {...concatProps}/> : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> )
		}}
	/>
)



class PageChangerWithoutRouter extends Component{
	state = {
		num: 0
	}

	componentDidMount(){
		l(this.props)
	}

	run(){
		

		let that = this
		let { history, paths } = this.props
		let num = 0

		setTimeout(function f(){
			history.push(paths[num++])

			if(paths.length > num) setTimeout(f, 2000)
			/*that.setState({num: ++that.state.num},
				() => {
					l('paths.length : ', paths.length)
					l('that.state.num : ', that.state.num)
					if(paths.length > that.state.num) setTimeout(f, 2000)		
				}
			)*/
		}, 0)
	}	

	render = () => <button onClick={() => { this.run()  }}> run </button>
}

let PageChanger = withRouter(PageChangerWithoutRouter)

export default App
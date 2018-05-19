import React , { Component } from 'react'
import { Route, Redirect, Link, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './page.less'

let Page0 = () => <div className="Page Page0"> Page0 </div>

let Page1 = () => <div className="Page Page1"> Page1 </div>

let Page2 = () => <div className="Page Page2"> Page2 </div>

let NotFound = () => <div className="Page PageNotFound"> NotFound </div>




let Animated = ({ match }) => {
	let rootPath = match.path

	return (
		<Route render={({ location }) => (
			<div> 
				<Route exact path={`${rootPath}/`} render={() => <Redirect to={`${rootPath}/page0`} />} /> 

				<ul>
					<li><Link to='page0'> Page0 </Link></li>
					<li><Link to='page1'> Page1 </Link></li>
					<li><Link to='page2'> Page2 </Link></li>	
				</ul>

				<div className="Page_wrapper">
					<TransitionGroup>
						{/* note that CSSTransition use className_S_ not className*/}
					    <CSSTransition key={location.key} timeout={500} classNames="fade">
					        <Switch location={location}>
					            <Route path={`${rootPath}/page0`} component={Page0}/> 
								<Route path={`${rootPath}/page1`} component={Page1}/> 
								<Route path={`${rootPath}/page2`} component={Page2}/> 
								<Route component={NotFound}/>
					        </Switch>
					    </CSSTransition>
					</TransitionGroup>
				</div>
			</div>
		)}/> 
	)
}


export default Animated
import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'

let counter = 0

let Inside = ({ history, match }) => {

	let { path } = match

	return (
		<div style={{userSelect: 'none'}}> 
			<h1 onClick={() => { history.push(`${path}/${counter++}`)}}> Inside </h1>
			<Route path="/inside/:text" component={DeepInside}/>
		</div>
	)
}


let DeepInside = ({ match }) => {
	l(match.params)

	return <div> DeepInside: {match.params.text} </div>
}


let InsideWithRouter = withRouter(Inside)

export default InsideWithRouter
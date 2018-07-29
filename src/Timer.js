import React, { Component } from 'react'
import { subscribeToTimer } from './api'

class Timer extends Component {
	constructor(props) {
		super(props);
		subscribeToTimer((err, timestamp) => this.setState({ 
			timestamp 
		}))
		
		this.state = {
			timestamp: 'no timestamp yet'
		}
	}
	
	render() {
		return (
			<div className="App">
			  <p className="App-intro">
				This is the timer value: {this.state.timestamp}
			  </p>
			</div>
		)
	}
	
}

export default Timer
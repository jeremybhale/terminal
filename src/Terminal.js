import React, { Component } from 'react'

import io from 'socket.io-client'
const port = process.env.PORT || 8000
const socket = io.connect('https://chatwithleaonard-client.herokuapp.com/')

class Terminal extends Component {
	constructor(props) {
		super(props)
				
		this.state = {
			notes: [],
			user: 'DBenz'
		}
		this.eachNote = this.eachNote.bind(this)
		this.save = this.save.bind(this)
		this.nextId = this.nextId.bind(this)
		this.join = this.join.bind(this)
		this.addNewMessage = this.addNewMessage.bind(this)
		this.changeUser = this.changeUser.bind(this)
	}
	
	componentWillMount() {
		socket.on('join', this.join)
	}
	
	componentDidMount() {
		document.getElementById('cmdVal').focus();
		socket.on('newNote', data => this.addNewMessage(data))
		socket.on('cUN', data => this.changeUser(data))
	}
	
	join(serverState) {
		this.setState({ notes: serverState.notes })
	}
	
	changeUser(newUser) {
		this.setState({ user: newUser })
	}
	
	addNewMessage(data) {
		this.setState(prevState => ({
			notes: [
				...prevState.notes,
				data
			]
		}))
	}
	
	save(e) {
		e.preventDefault()

		var data = {
			id: this.nextId(),
			user: this.state.user,
			note: this._newText.value
		}
		
		socket.emit('addNote', data)
		
		this._newText.value = ""
	}
	
	nextId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}
	
	eachNote(note, i) {
		return (
			<div 
				key={i}
				className="note"
				id={note.id}>
				{note.user}: {note.note}
			</div>
		)			
	}
	
	render() {
		return (
			<div>
				<div id="history">
					Locus Industries Terminal Communication System<br/>
					"LITeSys" v1.26<br/>
					==============================================<br/><br/>
					{this.state.notes.map(this.eachNote)}
				</div>
				<form id="wrap" autoComplete="off" onSubmit={this.save}>
					{this.state.user}:~$ <input type="text" 
									id="cmdVal"
									ref={input => this._newText = input}/>
				</form>
			</div>
		)
	}
}

export default Terminal

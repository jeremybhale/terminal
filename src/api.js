import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8000')

function sendNote(id, newMessage, userName, cb) {
	socket.emit('sendMessage', id, newMessage, userName, cb)
}

function handleReceiveNote(cb) {
	console.log("YES")
}

function receiveAllNotes(notes, cb) {
	socket.emit('requestAllNotes')
	socket.on('receiveAllNotes', newNotes => notes = newNotes )
	return notes
}

socket.on('receiveNote', handleReceiveNote)

export { sendNote }
export { receiveAllNotes }
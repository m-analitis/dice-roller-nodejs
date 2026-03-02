const express = require('express')
app = express()

const cors = require("cors")

var url = require('url');

const port = process.env.PORT || 3000

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))
app.use(cors({ origin: '*' }))

// Ping the server
app.get('/api/ping', (request, response) => {
	console.log('Calling "/api/ping"')
	response.type('text/plain')
	response.send('ping response')
})

// Roll n six-sided dice, n is passed in the URL.
app.get('/roll', (request, response) => {
	console.log('Calling "/roll" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let numDice = parseInt(inputs.num)
	let rolls = []
	for (let i = 0; i < numDice; i++) {
        let rand = Math.floor(Math.random()*6) + 1
		rolls[i] = rand
    }
	response.type('application/json')
	response.send(JSON.stringify(rolls))
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)

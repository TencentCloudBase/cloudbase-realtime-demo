const express = require('express')
const serverless = require('serverless-http')
const app = express()

app.get('/', (req, res) => res.send('Hello Tweb!'))
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`))

exports.main = serverless(express().use('/express', app))
// app.listen(3000, () => console.log('Example app listening on port 3000!'))
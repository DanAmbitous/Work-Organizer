const express = require('express')
const app = express()
const PORT = process.env.PORT || 9895
const path = require('path')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' + '/workOrganizer.html'))
})

app.get('/credit', (req, res) => {
  res.send('by Danial')
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`)) 
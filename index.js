//const http = require('http')
/*
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World')
})*/
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

let notes = [  
   {    
   	  id: 1,    
   	  content: "HTML is easy",    
   	  date: "2020-01-10T17:30:31.098Z",    
   	  important: true  
   },  
   {    
   	  id: 2,    
   	  content: "Browser can execute only Javascript",    
   	  date: "2020-01-10T18:39:34.091Z",    
   	  important: false  
   },  
   {    
   	  id: 3,    
   	  content: "GET and POST are the most important methods of HTTP protocol",    
   	  date: "2020-01-10T19:20:14.298Z",    
   	  important: true  
   	}
 ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if(note){
  	response.json(note)
  } else {
  	response.status(404).end()
  }
  //console.log(id)
  //const note = notes.find(note => {
  //	console.log(note.id, typeof note.id, id, typeof id, note.id === id)
  //  return note.id === id
  //})
  //console.log(note)  
  //console.log(id)
  //response.json(note)
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  //const maxId = notes.length > 0
  //  ? Math.max(...notes.map(n => n.id))
  //  :0
  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }
  /*
  const note = request.body
  console.log(note)
  note.id = maxId + 1
  */
  const note ={
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id:generateId(),
  }
  notes = notes.concat(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
/*
 const app = http.createServer((request, response) => {  
 	response.writeHead(200, { 'Content-Type': 'application/json' })
 	response.end(JSON.stringify(notes))
 })


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
*/
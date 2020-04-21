const express = require('express')
const bodyParser = require('body-parser')
const db = require('./quries')
const app = express()
const port = 3001

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/users', db.getUsers)
app.get('/getusers/:id', db.getUserById)
app.post('/sendusers', db.createUser)
app.put('/putusers/:id', db.updateUser)
app.delete('/delusers/:id', db.deleteUser)
app.delete('/usersName/:name', db.deleteUserByName)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
    })

const express = require('express')
const cors = require('cors');

const db = require('./quries')
const api = require('./api')

const app = express()
app.use(cors());

const dotenv = require('dotenv')
dotenv.config({ path : './.env'})


app.listen(process.env.APP_PORT, () => {
  console.log(`MEAN STACK CRUD APP running on port ${process.env.APP_PORT}.`)
  })

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.use(express.json())


app.get('/users', db.getUsers)
app.get('/getusers/:id', db.getUserById)
app.post('/sendusers', db.createUser)
app.put('/putusers/:id', db.updateUser)
app.delete('/delusers/:id', db.deleteUser)
app.delete('/usersName/:name', db.deleteUserByName)

app.get('/getMockData', api.mockDataTest)
app.get('/fetchStates', api.listOfStates)

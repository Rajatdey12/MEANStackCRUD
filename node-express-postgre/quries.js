/* -- Create database connection --*/ 

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DemoBase',
  password: 'password',
  port: 5432,
})

/*-- Get all users --*/
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  /*-- Get a single user by id--*/
const getUserById = (request, response) =>{
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/* -- Post a new user --*/
const createUser = (request, response, next) => {
    const { id, name, email } = request.body
  
    pool.query('INSERT INTO users (id, name, email) VALUES ($1, $2, $3)', [id, name, email], (error, results) => {
      if (error) {
        next(error)
      }
      else{
      response.status(201).send(`User added with ID: ${request.body.id}`)
      }
    })
  }

/*-- Put a new user to an existing user --*/
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  /*-- Delete a user --*/
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  /*-- Delete a user by name --*/
  const deleteUserByName = (request, response) => {
    const name = request.params.name
  
    pool.query('DELETE FROM users WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with Name: ${name}`)
    })
  }

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteUserByName
  }
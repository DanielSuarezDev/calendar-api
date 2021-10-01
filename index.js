const express = require('express')
require('dotenv').config()
const {dcConnection} = require('./database/config')
const cors = require('cors')

// crear el servidor express

const app = express();

// DB
dcConnection()

//cors
app.use(cors())

// directorio publico
app.use(express.static('public'))

// lectura del body
app.use(express.json())


// rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
// TODO: Curd: eventos

// escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`server running in port ${process.env.PORT}`)
})




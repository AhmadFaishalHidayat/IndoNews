if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()    
}
const errorHandler = require('./middleware/handleError')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

app.use('/', require('./router/index'));
app.use(errorHandler)

module.exports = app
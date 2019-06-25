'use strict'

// Config env var .env
require('dotenv').config()

// Connection MongoDB
require('./connections/DB')

const express = require('express')
const path = require('path')
const cors = require('cors')
const ip = require('ip')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const multiparty = require('connect-multiparty')
const API = require('./controllers/api')

const PORT = parseInt(process.env.PORT) || 8080
const app = express()

// Don't expose any software information to potential hackers.
app.disable('x-powered-by')

// Will be replacement by the auth middleware
app.use((req, res, next) => {
  req.decode = {}
  next()
})

app.use(cors())
app.use(morgan('dev'))
app.use(methodOverride())
app.use(multiparty())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(API)

app.listen(PORT, () => {
  console.log(`
  ⚡
    DEV MODE: ${process.env.NODE_ENV}
    GO: http://${ip.address()}:${PORT}
    GO: http://localhost:${PORT}
  `)
})

// export server for testing
module.exports = app

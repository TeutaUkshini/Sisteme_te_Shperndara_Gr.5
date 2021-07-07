'use strict'

const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const routes = require('./routes')
var cors = require('cors')
const app = express()

app.use(cors())

var corsOptions = {
  origin: false,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: true }))

// routes
app.use(routes)

// 404 error handler
app.use((req, res, next) => {
  next(new createError.NotFound())
})

// error middleware
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Internal Server Error' })
})

exports.app = functions.https.onRequest(app)

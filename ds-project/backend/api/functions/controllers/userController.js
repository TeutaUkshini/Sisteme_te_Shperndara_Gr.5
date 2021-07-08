'use strict'

const HttpStatus = require('http-status-codes')
const users = require('../models/users')
const { serializeJson, deserializeJson } = require('../helper/json')
const { v4: uuidv4 } = require('uuid')
const db = require('../firebase/db')

class userController {
    constructor() {}
    createUser(req, res) {
        (async () => {
            try {
                const id = uuidv4()
                const user = new users({
                    id: id,
                    username: req.body.username,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password,
                    status: req.body.status
                })
                db.collection('users')
                    .doc('/' + id + '/')
                    .create(deserializeJson(serializeJson(user)))
                return res.status(HttpStatus.CREATED).send(id)
            } catch (err) {
                console.log(err)
                return res.status(500).send(error)
            }
        })()
    }

    getUser(req, res) {
        (async () => {
            try {
                const document = db.collection('users').doc(req.params.userId)
                let item = await document.get()
                let response = item.data()
                return res.status(200).send(response)
            } catch (err) {
                console.log(err)
                return res.status(500).send(error)
            }
        })()
    }

    listUsers(req, res) {
        (async () => {
            try {
                let query = db.collection('users')
                let response = []
                await query.get().then(querySnapshot => {
                    let docs = querySnapshot.docs
                    for (let doc of docs) {
                        const selectedItem = {
                            id: doc.id,
                            username: doc.data().username,
                            name: doc.data().name,
                            surname: doc.data().surname,
                            email: doc.data().email,
                            status: doc.data().status
                        }
                        response.push(selectedItem)
                    }
                    return docs
                })
                return res.status(HttpStatus.OK).send(response)
            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        })()
    }

    updateUser(req, res) {
        (async () => {
            try {
                const document = db.collection('users').doc(req.params.userId)
                await document.update({
                    username: req.body.username,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password,
                    status: req.body.status
                })
                return res.status(HttpStatus.OK).send()
            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        })()
    }

    deleteUser(req, res) {
        (async () => {
            try {
                const document = db.collection('users').doc(req.params.userId)
                await document.delete()
                return res.status(200).send()
            } catch (error) {
                console.log(error)
                return status(500).send(error)
            }
        })()
    }
}

module.exports = userController

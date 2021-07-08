'use strict'

const HttpStatus = require('http-status-codes')
const students = require('../models/students')
const { serializeJson, deserializeJson } = require('../helper/json')
const { v4: uuidv4 } = require('uuid')
const db = require('../firebase/db')

class studentsController {
    constructor() {}

    createStudent(req, res) {
        (async () => {
            try {
                const id = uuidv4()
                const student = new students({
                    id: id,
                    name: req.body.name,
                    surname: req.body.surname,
                    age: req.body.age,
                    contact: req.body.contact,
                    classname: req.body.classname
                })
                db.collection('students')
                    .doc('/' + id + '/')
                    .create(deserializeJson(serializeJson(student)))
                return res.status(HttpStatus.CREATED).send()
            } catch (err) {
                console.log(err)
                return res.status(500).send(error)
            }
        })()
    }

    getStudent(req, res) {
        (async () => {
            try {
                const document = db.collection('students').doc(req.params.studentId)
                let student = await document.get()
                let response = student.data()
                return res.status(200).send(response)
            } catch (err) {
                console.log(err)
                return res.status(500).send(error)
            }
        })()
    }

    listStudents(req, res) {
        (async () => {
            try {
                let query = db.collection('students')
                let response = []
                await query.get().then(querySnapshot => {
                    let docs = querySnapshot.docs
                    for (let doc of docs) {
                        const selectedItem = {
                            id: doc.id,
                            age:doc.data().age,
                            name: doc.data().name,
                            surname: doc.data().surname,
                            contact: doc.data().contact,
                            classname: doc.data().classname
                        }
                        response.push(selectedItem)
                    }
                    return res.status(HttpStatus.OK).send(response)
                }).catch(error => {
                    console.log(error);
                  })
            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        })()
    }

    updateStudent(req, res) {
        (async () => {
            try {
                const document = db.collection('students').doc(req.params.studentId)
                await document.update({
                    name: req.body.name,
                    surname: req.body.surname,
                    age: req.body.age,
                    contact: req.body.contact,
                    classname: req.body.classname
                })
                return res.status(HttpStatus.OK).send()
            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        })()
    }

    deleteStudent(req, res) {
        (async () => {
            try {
                const document = db.collection('students').doc(req.params.studentId)
                await document.delete()
                return res.status(200).send()
            } catch (error) {
                console.log(error)
                return status(500).send(error)
            }
        })()
    }
}

module.exports = studentsController

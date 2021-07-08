'use strict'

const HttpStatus = require('http-status-codes')
const posts = require('../models/posts')
const { serializeJson, deserializeJson } = require('../helper/json')
const { v4: uuidv4 } = require('uuid')
const db = require('../firebase/db')

class postController {
    constructor() {}

    createPost(req, res) {
        (async () => {
            try {
                const postId = uuidv4()
                const post = new posts({
                    postId: postId,
                    userId: req.body.userId,
                    text: req.body.text,
                    date: new Date()
                })
                db.collection('posts')
                    .doc('/' + postId + '/')
                    .create(deserializeJson(serializeJson(post)))
                return res.status(HttpStatus.CREATED).send()
            } catch (err) {
                console.log(err)
                return res.status(500).send(error)
            }
        })()
    }

    getPost(req, res) {
        (async () => {
            try {
                const document = db.collection('posts').doc(req.params.postId)
                let chat = await document.get()
                let response = chat.data()
                return res.status(200).send(response)
            } catch (err) {
                console.log(err)
                return res.status(500).send(error)
            }
        })()
    }

    listPosts(req, res) {
        (async () => {
            try {
                let query = db.collection('posts')
                let response = []
                await query.get().then(querySnapshot => {
                    let docs = querySnapshot.docs
                    for (let doc of docs) {
                        const selectedItem = {
                            postId: doc.id,
                            userId: doc.data().userId,
                            text: doc.data().text,
                            date: doc.data().date
                        }
                        response.push(selectedItem)
                    }
                    return res.status(HttpStatus.OK).send(response)
                }).catch(error => {
                    console.log(error);
                  })
                return res.status(HttpStatus.OK).send(response)
            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        })()
    }

    updatePost(req, res) {
        (async () => {
            try {
                const document = db.collection('posts').doc(req.params.postId)
                await document.update({
                    userId: body.req.userId,
                    text: body.req.text,
                    date: new Date()
                })
                return res.status(HttpStatus.OK).send()
            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        })()
    }

    deletePost(req, res) {
        (async () => {
            try {
                const document = db.collection('posts').doc(req.params.postId)
                await document.delete()
                return res.status(200).send()
            } catch (error) {
                console.log(error)
                return status(500).send(error)
            }
        })()
    }
}

module.exports = postController

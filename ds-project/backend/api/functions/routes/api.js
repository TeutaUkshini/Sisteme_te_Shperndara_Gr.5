'use strict'

const router = require('express').Router()
const userController = require('../controllers/userController')
const studentsController = require('../controllers/studentsController')
const chatController = require('../controllers/chatController')
const postController = require('../controllers/postController')

const user = new userController()
const student = new studentsController()
const chat = new chatController()
const post = new postController()

router.get('/user', user.listUsers.bind(user))
router.get('/user/:userId', user.getUser.bind(user))
router.post('/user', user.createUser.bind(user))
router.put('/user/:userId', user.updateUser.bind(user))
router.patch('/user/:userId', user.updateUser.bind(user))
router.delete('/user/:userId', user.deleteUser.bind(user))

router.get('/student', student.listStudents.bind(student))
router.get('/student/:studentId', student.getStudent.bind(student))
router.post('/student', student.createStudent.bind(student))
router.put('/student/:studentId', student.updateStudent.bind(student))
router.patch('/student/:studentId', student.updateStudent.bind(student))
router.delete('/student/:studentId', student.deleteStudent.bind(student))

// router.get('/chat', chat.listMessages.bind(chat))
router.get('/chat/:chatName', chat.getChat.bind(chat))
router.post('/chat', chat.createMessages.bind(chat))
// router.put('/chat/:msgId', chat.updatechat.bind(chat))
// router.patch('/chat/:msgId', chat.updatechat.bind(chat))
// router.delete('/chat/:msgId', chat.deletechat.bind(chat))

router.get('/post', post.listPosts.bind(post))
router.get('/post/:postId', post.getPost.bind(post))
router.post('/post', post.createPost.bind(post))
router.put('/post/:postId', post.updatePost.bind(post))
router.patch('/post/:postId', post.updatePost.bind(post))
router.delete('/post/:postId', post.deletePost.bind(post))

module.exports = router

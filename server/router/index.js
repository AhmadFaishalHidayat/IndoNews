const express = require('express')
const UserController = require('../controllers/UserController')
const Controller = require('../controllers/Controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const openAI = require('../helpers/openai')
const router = express.Router()


// router.get('/', (req, res) => {
//     res.send('helo')
// })

//login
router.post('/login', UserController.login)
router.post('/login/google', UserController.googleLogin)

//Register
router.post('/register', UserController.register)



// OpenAI
router.post('/search-ai', Controller.searchAi)

router.use(authentication)
router.get('/news', Controller.getAllNews)
router.get('/news-byuser', Controller.getAllNewsByUser)
router.post('/news/add', Controller.addNews)
router.put('/news/edit/:id', authorization, Controller.editNews)
router.delete('/news/delete/:id', authorization, Controller.delNews)

//get News by id
router.get('/news/:id', Controller.getNewsById)

module.exports = router
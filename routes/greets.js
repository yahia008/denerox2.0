const express = require('express')
const {greet} = require('../controller/greet')
const {protector} = require('../middlewares/protector')



const router = express.Router()

/**
 * @swagger
 * /greet:
 *   get:
 *     summary: wellcome msg
 *     description: jst testing the api
 *     responses:
 *       200:
 *         description: to test Get method
 */
 router.get('/greet', greet)

module.exports= router;
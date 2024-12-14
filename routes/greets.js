const express = require('express')
const {greet} = require('../controller/greet')
const {protector} = require('../middlewares/protector')



const router = express.Router()
 router.get('/greet', protector, greet)

module.exports= router;
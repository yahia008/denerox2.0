const express = require('express')
const {verifyPin, transactionPin, resetPin} = require('../controller/txpin')
const {protector} = require('../middlewares/protector')

const router = express.Router()
router.post('/createPin', protector, transactionPin)
router.get('/resetPin', protector, resetPin)
router.post('/verifyPin', protector, verifyPin)

module.exports = router;

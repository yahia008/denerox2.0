const express = require('express')
const {Profile} = require('../controller/profile')
const {protector} = require('../middlewares/protector')

const router = express.Router()

router.get('/profile', protector, Profile)

module.exports= router;
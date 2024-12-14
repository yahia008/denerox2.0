const express = require('express')
const {deposit, transfer, verify} = require('../controller/transaction')
const {protector} = require('../middlewares/protector')
const {withdrawal} = require('../middlewares/withdrawal')
const {transactionHistory, getTransactionById } = require('../controller/history')
const {search} = require('../controller/search')
const router = express.Router()

router.post('/deposit', protector, deposit)
router.post('/transfer', protector, withdrawal, transfer)
router.post('/verify', protector, verify)
router.post('/search',  search)
router.get('/transactions/:id',  transactionHistory)
router.get('/transaction/:id',  getTransactionById)

module.exports = router;
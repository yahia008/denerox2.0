const express = require('express')
const {deposit, transfer, verify} = require('../controller/transaction')
const {protector} = require('../middlewares/protector')
const {withdrawal} = require('../middlewares/withdrawal')
const {transactionHistory, getTransactionById } = require('../controller/history')
const {search} = require('../controller/search')
const router = express.Router()

/**
 * @swagger
 * /deposit:
 *   post:
 *     summary: Deposit funds into the user's account
 *     description: Allows an authenticated user to deposit funds into their account.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []  # JWT Bearer token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to deposit.
 *                 example: 500.00
 *               description:
 *                 type: string
 *                 description: A description for the deposit.
 *                 example: "Salary payment"
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deposit successful"
 *                 amount:
 *                   type: number
 *                   example: 500.00
 *                 balance:
 *                   type: number
 *                   example: 1500.00
 *       400:
 *         description: Invalid input (e.g., missing amount or description)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Amount is required and must be a positive number"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error, please try again later"
 * 
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post('/deposit', protector, deposit)
/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer funds to another account
 *     description: Allows an authenticated user to transfer funds to a specified account using an account number and PIN.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []  # JWT Bearer token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - accountNumber
 *               - description
 *               - pin
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to transfer.
 *                 example: 200.00
 *               accountNumber:
 *                 type: string
 *                 description: The recipient's account number.
 *                 example: "1234567890"
 *               description:
 *                 type: string
 *                 description: A description for the transfer.
 *                 example: "Payment for services"
 *               pin:
 *                 type: string
 *                 description: The user's transaction PIN.
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transfer successful"
 *                 amount:
 *                   type: number
 *                   example: 200.00
 *                 recipientAccountNumber:
 *                   type: string
 *                   example: "1234567890"
 *                 description:
 *                   type: string
 *                   example: "Payment for services"
 *                 balance:
 *                   type: number
 *                   example: 800.00
 *       400:
 *         description: Bad request (e.g., missing or invalid fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid account number or PIN"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token"
 *       403:
 *         description: Forbidden (e.g., insufficient balance)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Insufficient funds"
 *       404:
 *         description: Recipient account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recipient account not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error, please try again later"
 * 
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post('/transfer', protector, withdrawal, transfer)
/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify user OTP
 *     description: Allows an authenticated user to verify their account using a one-time password (OTP).
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []  # JWT Bearer token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The one-time password sent to the user's email or phone.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verification successful"
 *                 verified:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (e.g., invalid or missing OTP)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing OTP"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token"
 *       403:
 *         description: Forbidden (e.g., OTP expired)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP expired, please request a new one"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error, please try again later"
 * 
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post('/verify', protector, verify)
/**
 * @swagger
 * /search:
 *   post:
 *     summary: Search for an account
 *     description: Search for account details using the provided account number.
 *     tags: [Account Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accountNumber
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 description: The account number to search for.
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account found"
 *                 account:
 *                   type: object
 *                   properties:
 *                     accountNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     accountName:
 *                       type: string
 *                       example: "John Doe"
 *                     balance:
 *                       type: number
 *                       example: 2500.00
 *       400:
 *         description: Bad request (e.g., missing or invalid account number)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing account number"
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error, please try again later"
 */

router.post('/search',  search)
/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get transaction history
 *     description: Retrieve the transaction history for a specific user by their ID.
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID whose transaction history is to be retrieved.
 *         example: "64b8f9e2d6d3a1e3f6b3c8f1"
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction history retrieved successfully"
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-27T12:00:00Z"
 *                       amount:
 *                         type: number
 *                         example: 500.00
 *                       transactionType:
 *                         type: string
 *                         enum: [deposit, withdrawal, transfer]
 *                         example: "deposit"
 *                       description:
 *                         type: string
 *                         example: "Salary payment"
 *       400:
 *         description: Invalid user ID provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid user ID"
 *       404:
 *         description: No transactions found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No transactions found for this user"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error, please try again later"
 */

router.get('/transactions/:id',  transactionHistory)
/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     description: Retrieve details of a specific transaction using its unique ID.
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the transaction to retrieve.
 *         example: "64b8f9e2d6d3a1e3f6b3c8f1"
 *     responses:
 *       200:
 *         description: Transaction details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction retrieved successfully"
 *                 transaction:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64b8f9e2d6d3a1e3f6b3c8f1"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-27T12:00:00Z"
 *                     amount:
 *                       type: number
 *                       example: 150.00
 *                     transactionType:
 *                       type: string
 *                       enum: [deposit, withdrawal, transfer]
 *                       example: "withdrawal"
 *                     description:
 *                       type: string
 *                       example: "ATM withdrawal"
 *       400:
 *         description: Invalid transaction ID provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid transaction ID"
 *       404:
 *         description: Transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error, please try again later"
 */

router.get('/transaction/:id',  getTransactionById)

module.exports = router;
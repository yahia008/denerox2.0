const express = require('express')
const {verifyPin, transactionPin, resetPin} = require('../controller/txpin')
const {protector} = require('../middlewares/protector')

const router = express.Router()
/**
 * @swagger
 * /createPin:
 *   post:
 *     summary: Create a transaction PIN
 *     description: Allows an authenticated user to create a transaction PIN. This route is protected and requires a valid JWT token.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 description: The 4-6 digit transaction PIN to be created.
 *                 example: "1234"
 *     responses:
 *       201:
 *         description: Transaction PIN created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction PIN created successfully"
 *       400:
 *         description: Invalid request or PIN format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid PIN format"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized, token is invalid or missing"
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

router.post('/createPin', protector, transactionPin)
/**
 * @swagger
 * /resetPin:
 *   get:
 *     summary: Reset transaction PIN
 *     description: Allows an authenticated user to reset their transaction PIN. This route is protected and requires a valid JWT token.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction PIN reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction PIN reset successfully"
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized, token is invalid or missing"
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

router.get('/resetPin', protector, resetPin)
/**
 * @swagger
 * /verifyPin:
 *   post:
 *     summary: Verify transaction PIN with OTP
 *     description: Allows an authenticated user to verify their transaction PIN using an OTP. This route is protected and requires a valid JWT token.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The one-time password sent for verification.
 *                 example: "123456"
 *               pin:
 *                 type: string
 *                 description: The transaction PIN to verify.
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: PIN verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction PIN verified successfully"
 *       400:
 *         description: Invalid OTP or PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid OTP or PIN"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized, token is invalid or missing"
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

router.post('/verifyPin', protector, verifyPin)

module.exports = router;

const express = require('express')
const {signUp, signIn} = require('../controller/auth')
const {forgotPassword, resetPassword} = require('../controller/resetpassword')


const router = express.Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: Doe
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: StrongPassword123!
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: User registered successfully
 *                 token:
 *                   type: string
 *                   description: The ID of the newly registered user
 *                   example: "6489d5f82e3b9e3cd223a001"
 *       400:
 *         description: Bad request - Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Email is required"
 */
router.post('/register', signUp)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: StrongPassword123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                   example: Login successful
 *                 id:
 *                   type: string
 *                   description: User's unique ID
 *                   example: "6489d5f82e3b9e3cd223a001"
 *                 name:
 *                   type: string
 *                   description: User's first name
 *                   example: John
 *                 email:
 *                   type: string
 *                   description: User's email address
 *                   example: john.doe@example.com
 *                 balance:
 *                   type: number
 *                   description: Account balance
 *                   example: 5000.75
 *                 accountName:
 *                   type: string
 *                   description: Account holder's name
 *                   example: John Doe
 *                 accountNumber:
 *                   type: string
 *                   description: User's account number
 *                   example: "1234567890"
 *                 accountId:
 *                   type: string
 *                   description: Linked account's ID
 *                   example: "6489d5f82e3b9e3cd223a002"
 *                 token:
 *                   type: string
 *                   description: JWT for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Login failed due to invalid credentials or server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid phone number or password
 */

router.post('/login', signIn)

/**
 * @swagger
 * /forgotpassword:
 *   post:
 *     summary: Send a password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Password reset email sent
 *       400:
 *         description: Failed to send password reset email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Unable to send password reset email
 */

router.post('/forgotpassword', forgotPassword)
/**
 * @swagger
 * /{token}/resetpassword:
 *   patch:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The password reset token (SHA256 hashed)
 *         schema:
 *           type: string
 *           example: "abcd1234efgh5678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password to set for the user
 *                 example: "NewSecurePassword123!"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Password reset successful
 *       400:
 *         description: Invalid or expired token, or other error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid or expired token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Server error, please try again later
 */

router.patch('/:token/resetpassword', resetPassword)
module.exports = router;
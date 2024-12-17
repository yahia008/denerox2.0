const express = require('express')
const {Profile} = require('../controller/profile')
const {protector} = require('../middlewares/protector')

const router = express.Router()
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Fetches the profile of the authenticated user.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []  # This defines that JWT token is required for this route
 *     responses:
 *       200:
 *         description: User profile successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60b8f5f1a1b8d5a26c1e9d2f"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 phoneNumber:
 *                   type: string
 *                   example: "1234567890"
 *       401:
 *         description: Unauthorized (invalid token or token not provided)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
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

router.get('/profile', protector, Profile)

module.exports= router;
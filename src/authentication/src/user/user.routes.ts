import express from "express";
import { validate } from "@src/middleware/validate";
import * as Validation from "./validation";
import * as Handler from "./user.handler";

const router = express.Router();

/**
 * @swagger
 * /v2/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration data
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             full_name:
 *               type: string
 *             address:
 *               type: string
 *             phone_number:
 *               type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/User'
 *             status:
 *               type: integer
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       409:
 *         description: Conflict - user already exists
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post("/v2/users/register", validate(Validation.registerSchema), Handler.registerHandler);

/**
 * @swagger
 * /v2/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in a user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *             status:
 *               type: integer
 *       404:
 *         description: Invalid credentials
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post("/v2/auth/login", validate(Validation.loginSchema), Handler.loginHandler);

/**
 * @swagger
 * /v2/auth/verify:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify a user token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: token
 *         description: Token to verify
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - token
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       200:
 *         description: Token is valid
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/User'
 *             status:
 *               type: integer
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post("/v2/auth/verify", validate(Validation.verifyTokenSchema), Handler.verifyTokenHandler);

/**
 * @swagger
 * /v2/auth/verify-admin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify an admin token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: token
 *         description: Admin token to verify
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - token
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       200:
 *         description: Admin token is valid
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/User'
 *             status:
 *               type: integer
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post("/v2/auth/verify-admin", validate(Validation.verifyAdminTokenSchema), Handler.verifyAdminTokenHandler);

export default router;

import express from 'express';
import { validate } from "@src/middleware/validate";
import * as Validation from './validation';
import * as Handler from './order.handler';
import { verifyJWT } from "@src/middleware/verifyJWT";

const router = express.Router();

/**
 * @swagger
 * /order:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders for authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders placed by the user
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Order'
 *       500:
 *         description: Internal server error while fetching orders
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/order', verifyJWT, Handler.getAllOrdersHandler);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     tags: [Order]
 *     summary: Get order detail by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         schema:
 *           $ref: '#/definitions/OrderDetail'
 *       401:
 *         description: You are not authorized to view this order
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       404:
 *         description: Order with the specified ID was not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/order/:orderId', verifyJWT, validate(Validation.getOrderDetailSchema), Handler.getOrderDetailHandler);

/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Order]
 *     summary: Place a new order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: shipping
 *         required: true
 *         schema:
 *           type: object
 *           required: [shipping_provider]
 *           properties:
 *             shipping_provider:
 *               type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         schema:
 *           $ref: '#/definitions/Order'
 *       400:
 *         description: Invalid shipping provider or empty cart
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Server error during order placement
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/order', verifyJWT, validate(Validation.placeOrderSchema), Handler.placeOrderHandler);

/**
 * @swagger
 * /order/{orderId}/pay:
 *   post:
 *     tags: [Order]
 *     summary: Pay for an order
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         type: string
 *       - in: body
 *         name: payment
 *         required: true
 *         schema:
 *           type: object
 *           required: [payment_method, payment_reference, amount]
 *           properties:
 *             payment_method:
 *               type: string
 *             payment_reference:
 *               type: string
 *             amount:
 *               type: number
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *         schema:
 *           $ref: '#/definitions/Payment'
 *       400:
 *         description: Payment amount does not match order total or is invalid
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Error while processing payment
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/order/:orderId/pay', validate(Validation.payOrderSchema), Handler.payOrderHandler);

/**
 * @swagger
 * /order/{orderId}/cancel:
 *   post:
 *     tags: [Order]
 *     summary: Cancel an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order canceled successfully
 *         schema:
 *           $ref: '#/definitions/Order'
 *       401:
 *         description: You are not authorized to cancel this order
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       404:
 *         description: Order not found or already canceled
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Error while canceling the order
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/order/:orderId/cancel', verifyJWT, validate(Validation.cancelOrderSchema), Handler.cancelOrderHandler);

export default router;

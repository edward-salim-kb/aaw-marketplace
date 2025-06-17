import express from 'express';
import { validate } from "@src/middleware/validate";
import * as Validation from './validation';
import * as Handler from './cart.handler';
import { verifyJWT } from "@src/middleware/verifyJWT";

const router = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get all items in cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/CartItem'
 *       404:
 *         description: No cart items found for this user
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error while fetching cart
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/cart', verifyJWT, Handler.getAllCartItemsHandler);

/**
 * @swagger
 * /cart:
 *   post:
 *     tags: [Cart]
 *     summary: Add item to cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: item
 *         required: true
 *         schema:
 *           type: object
 *           required: [product_id, quantity]
 *           properties:
 *             product_id:
 *               type: string
 *             quantity:
 *               type: number
 *     responses:
 *       201:
 *         description: Item successfully added to cart
 *         schema:
 *           $ref: '#/definitions/CartItem'
 *       404:
 *         description: User or product not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Error while adding item to cart
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/cart', verifyJWT, validate(Validation.addItemToCartSchema), Handler.addItemToCartHandler);

/**
 * @swagger
 * /cart:
 *   put:
 *     tags: [Cart]
 *     summary: Edit cart item quantity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: item
 *         required: true
 *         schema:
 *           type: object
 *           required: [cart_id]
 *           properties:
 *             cart_id:
 *               type: string
 *             quantity:
 *               type: number
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         schema:
 *           $ref: '#/definitions/CartItem'
 *       500:
 *         description: Failed to update cart item
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.put('/cart', verifyJWT, validate(Validation.editCartItemSchema), Handler.editCartItemHandler);

/**
 * @swagger
 * /cart:
 *   delete:
 *     tags: [Cart]
 *     summary: Delete item from cart by product ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: item
 *         required: true
 *         schema:
 *           type: object
 *           required: [product_id]
 *           properties:
 *             product_id:
 *               type: string
 *     responses:
 *       200:
 *         description: Item removed from cart
 *         schema:
 *           $ref: '#/definitions/CartItem'
 *       404:
 *         description: Item not found in cart
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Failed to remove item from cart
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.delete('/cart', verifyJWT, validate(Validation.deleteCartItemSchema), Handler.deleteCartItemHandler);

export default router;

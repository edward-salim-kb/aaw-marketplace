import express from "express";
import { validate } from "@src/middleware/validate";
import * as Validation from './validation';
import * as Handler from './wishlist.handler';
import { verifyJWT } from "@src/middleware/verifyJWT";

const router = express.Router();

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get all wishlists for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlists fetched successfully
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Wishlist'
 *             status:
 *               type: integer
 *       404:
 *         description: User ID is missing
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/', verifyJWT, Handler.getAllUserWishlistHandler);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get wishlist details by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Wishlist ID
 *     responses:
 *       200:
 *         description: Wishlist detail found
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/WishlistDetail'
 *             status:
 *               type: integer
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       404:
 *         description: Wishlist not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/:id', verifyJWT, validate(Validation.getWishlistByIdSchema), Handler.getWishlistByIdHandler);

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Create a new wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: wishlist
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       201:
 *         description: Wishlist created successfully
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Wishlist'
 *             status:
 *               type: integer
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/', verifyJWT, validate(Validation.createWishlistSchema), Handler.createWishlistHandler);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   put:
 *     tags:
 *       - Wishlist
 *     summary: Update a wishlist's name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *       - in: body
 *         name: name
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Wishlist updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Wishlist'
 *             status:
 *               type: integer
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.put('/:id', verifyJWT, validate(Validation.updateWishlistSchema), Handler.updateWishlistHandler);

/**
 * @swagger
 * /api/wishlist/remove:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Remove a product from wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: wishlistDetail
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: WishlistDetail ID
 *     responses:
 *       200:
 *         description: Product removed successfully
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/WishlistDetail'
 *             status:
 *               type: integer
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.delete('/remove', verifyJWT, validate(Validation.removeProductFromWishlistSchema), Handler.removeProductFromWishlistHandler);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Delete wishlist by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Wishlist deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Wishlist'
 *             status:
 *               type: integer
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.delete('/:id', verifyJWT, validate(Validation.deleteWishlistSchema), Handler.deleteWishlistHandler);

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Add product to wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: product
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - wishlist_id
 *             - product_id
 *           properties:
 *             wishlist_id:
 *               type: string
 *             product_id:
 *               type: string
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/WishlistDetail'
 *             status:
 *               type: integer
 *       401:
 *         description: Unauthorized to add product
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/add', verifyJWT, validate(Validation.addProductToWishlistSchema), Handler.addProductToWishlistHandler);

export default router;

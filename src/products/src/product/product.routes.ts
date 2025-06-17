import express from 'express';
import { validate } from '@src/middleware/validate';
import * as Validation from './validation';
import * as Handler from './product.handler';
import { verifyJWT } from '@src/middleware/verifyJWT';

const router = express.Router();

/**
 * @swagger
 * /v2/product:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Product'
 *             status:
 *               type: integer
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/v2/product', Handler.getAllProductsHandler);

/**
 * @swagger
 * /v2/product/category:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Category'
 *             status:
 *               type: integer
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/v2/product/category', Handler.getAllCategoryHandler);

/**
 * @swagger
 * /v2/product/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product found
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Product'
 *             status:
 *               type: integer
 *       404:
 *         description: Product not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/v2/product/:id', validate(Validation.getProductByIdSchema), Handler.getProductByIdHandler);

/**
 * @swagger
 * /v2/product/many:
 *   post:
 *     tags:
 *       - Products
 *     summary: Get many products by IDs
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: ids
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ids:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of products
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 *             status:
 *               type: integer
 *       400:
 *         description: Invalid or missing product IDs
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/v2/product/many', validate(Validation.getManyProductDatasByIdSchema), Handler.getManyProductDatasByIdHandler);

/**
 * @swagger
 * /v2/product/category/{category_id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Products in category
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Product'
 *             status:
 *               type: integer
 *       404:
 *         description: No products found for this category
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/v2/product/category/:category_id', validate(Validation.getProductByCategorySchema), Handler.getProductByCategoryHandler);

/**
 * @swagger
 * /v2/product:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a product
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: product
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: Product created
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Product'
 *             status:
 *               type: integer
 *       409:
 *         description: Product already exists
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/v2/product', verifyJWT, validate(Validation.createProductSchema), Handler.createProductHandler);

/**
 * @swagger
 * /v2/product/category:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a category
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: category
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       201:
 *         description: Category created
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Category'
 *             status:
 *               type: integer
 *       409:
 *         description: Category already exists
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/v2/product/category', verifyJWT, validate(Validation.createCategorySchema), Handler.createCategoryHandler);

/**
 * @swagger
 * /v2/product/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Edit a product
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: product
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Product'
 *             status:
 *               type: integer
 *       404:
 *         description: Product not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.put('/v2/product/:id', verifyJWT, validate(Validation.editProductSchema), Handler.editProductHandler);

/**
 * @swagger
 * /v2/product/category/{category_id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Edit a category
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         type: string
 *       - in: body
 *         name: category
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Category updated
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Category'
 *             status:
 *               type: integer
 *       404:
 *         description: Category not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.put('/v2/product/category/:category_id', verifyJWT, validate(Validation.editCategorySchema), Handler.editCategoryHandler);

/**
 * @swagger
 * /v2/product/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Product'
 *             status:
 *               type: integer
 *       404:
 *         description: Product not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.delete('/v2/product/:id', verifyJWT, validate(Validation.deleteProductSchema), Handler.deleteProductHandler);

/**
 * @swagger
 * /v2/product/category/{category_id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Category'
 *             status:
 *               type: integer
 *       404:
 *         description: Category not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.delete('/v2/product/category/:category_id', verifyJWT, validate(Validation.deleteCategorySchema), Handler.deleteCategoryHandler);

export default router;

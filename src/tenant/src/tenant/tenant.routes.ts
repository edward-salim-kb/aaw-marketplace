import express from 'express';
import { validate } from '@src/middleware/validate';
import * as Validation from './validation';
import * as Handler from './tenant.handler';
import { verifyJWT } from '@src/middleware/verifyJWT';

const router = express.Router();

/**
 * @swagger
 * /tenant/{tenant_id}:
 *   get:
 *     tags:
 *       - Tenants
 *     summary: Get tenant by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenant_id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Tenant found
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 tenants:
 *                   $ref: '#/definitions/Tenant'
 *                 tenantDetails:
 *                   $ref: '#/definitions/TenantDetail'
 *             status:
 *               type: integer
 *       404:
 *         description: Tenant not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.get('/:tenant_id', verifyJWT, validate(Validation.getTenantSchema), Handler.getTenantHandler);

/**
 * @swagger
 * /tenant:
 *   post:
 *     tags:
 *       - Tenants
 *     summary: Create a new tenant
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: tenant
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - owner_id
 *             - name
 *           properties:
 *             owner_id:
 *               type: string
 *             name:
 *               type: string
 *     responses:
 *       201:
 *         description: Tenant created
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Tenant'
 *             status:
 *               type: integer
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('', verifyJWT, validate(Validation.createTenantSchema), Handler.createTenantHandler);

/**
 * @swagger
 * /tenant/{old_tenant_id}:
 *   put:
 *     tags:
 *       - Tenants
 *     summary: Edit a tenant
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: old_tenant_id
 *         required: true
 *         type: string
 *       - in: body
 *         name: tenant
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             tenant_id:
 *               type: string
 *             owner_id:
 *               type: string
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Tenant updated
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Tenant'
 *             status:
 *               type: integer
 *       401:
 *         description: Unauthorized to edit this tenant
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       404:
 *         description: Tenant not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.put('/:old_tenant_id', verifyJWT, validate(Validation.editTenantSchema), Handler.editTenantHandler);

/**
 * @swagger
 * /tenant:
 *   delete:
 *     tags:
 *       - Tenants
 *     summary: Delete a tenant
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: tenant
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - tenant_id
 *           properties:
 *             tenant_id:
 *               type: string
 *     responses:
 *       200:
 *         description: Tenant deleted
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/Tenant'
 *             status:
 *               type: integer
 *       401:
 *         description: Unauthorized to delete this tenant
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       404:
 *         description: Tenant not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.delete('', verifyJWT, validate(Validation.deleteTenantSchema), Handler.deleteTenantHandler);

export default router;

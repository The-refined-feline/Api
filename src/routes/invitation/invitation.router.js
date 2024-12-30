const router = require('express').Router();
const controller = require('../../controllers/invitation/invitation.controller');
const validationSchema = require('../../validators/invitation.validator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});
auth = require('../../middlewares/auth.middleware');
router.use(auth('', true));

router.post(
  '/add',
  validator.body(validationSchema.invitation),
  controller.addInvitation,
);

router.get(
  '/get',
  validator.body(validationSchema.getInvitation),
  controller.getInvitation,
);

router.patch(
  '/update/:id',
  validator.params(validationSchema.singleId),
  validator.body(validationSchema.invitation),
  controller.updateInvitation,
);

router.delete(
  '/delete/:id',
  validator.params(validationSchema.singleId),
  controller.deleteInvitation,
);

router.get('/latest', controller.latestInvitation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Invitation
 *     description: Invitation management operations
 */

/**
 * @swagger
 * /invitation/add:
 *   post:
 *     summary: Add a new invitation
 *     tags: [Invitation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       200:
 *         description: Invitation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invitation created successfully'
 *                 inviteData:
 *                   $ref: '#/components/schemas/Invitation'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /invitation/get:
 *   get:
 *     summary: Get invitations by month and year
 *     tags: [Invitation]
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           description: The month of the invitations to retrieve (e.g., "12" for December).
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *           description: The year of the invitations to retrieve (e.g., "2024").
 *     responses:
 *       200:
 *         description: Invitations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InvitationData'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /invitation/update/{id}:
 *   patch:
 *     summary: Update an existing invitation
 *     tags: [Invitation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the invitation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       200:
 *         description: Invitation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invitation updated successfully'
 *                 updatedInvite:
 *                   $ref: '#/components/schemas/Invitation'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Invitation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /invitation/delete/{id}:
 *   delete:
 *     summary: Delete an invitation by ID
 *     tags: [Invitation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the invitation to delete
 *     responses:
 *       200:
 *         description: Invitation deleted successfully
 *       400:
 *         description: Invalid request or input data
 *       404:
 *         description: Invitation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /invitation/latest:
 *   get:
 *     summary: Get the latest invitation
 *     tags: [Invitation]
 *     responses:
 *       200:
 *         description: Latest invitation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       404:
 *         description: No invitation found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invitation:
 *       type: object
 *       required:
 *         - description
 *         - date
 *       properties:
 *         description:
 *           type: string
 *           description: The description of the invitation
 *           example: 'Join us for the annual conference'
 *         transportationMoney:
 *           type: string
 *           description: The transportation money offered for the invitation
 *           example: '50'
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the invitation
 *           example: '2024-12-25'
 *     InvitationData:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the invitations
 *           example: '2024-12-25'
 *         invitations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Invitation'
 *         count:
 *           type: integer
 *           description: The number of invitations on this specific date
 *           example: 5
 *     GetInvitation:
 *       type: object
 *       required:
 *         - month
 *         - year
 *       properties:
 *         month:
 *           type: string
 *           description: The month for which invitations are being retrieved (e.g., "12")
 *           example: "12"
 *         year:
 *           type: string
 *           description: The year for which invitations are being retrieved (e.g., "2024")
 *           example: "2024"
 */

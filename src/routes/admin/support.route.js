const router = require('express').Router();
const controller = require('../../controllers/admin/support.controller');
const auth = require('../../middlewares/auth.middleware');

router.use(auth('admin'));

router.get('/view-support', controller.viewSupport);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Admin Support
 *   description: API for viewing and managing support queries by admin
 */

/**
 * @swagger
 * /admin/support/view-support:
 *   get:
 *     summary: View all support queries
 *     tags: [Admin Support]
 *     description: Fetches a list of all support queries submitted by users.
 *     responses:
 *       200:
 *         description: Support data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 supportData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         description: The ID of the user who submitted the support query
 *                       subject:
 *                         type: string
 *                         description: The subject of the support query
 *                       message:
 *                         type: string
 *                         description: The message/content of the support query
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of when the support query was created
 *       500:
 *         description: Internal server error
 */

const router = require('express').Router();
const controller = require('../controllers/report.controller');
const validationSchema = require('../validators/report.validation');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

router.use(auth('', true));

router.post(
  '/add',
  validator.body(validationSchema.report),
  controller.addReport,
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Report
 *     description: Operations related to reporting users and chats
 */

/**
 * @swagger
 * /report/add:
 *   post:
 *     summary: Report a user for inappropriate behavior or chat content
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: Successfully reported the user or chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Reported Successfully'
 *                 data:
 *                   $ref: '#/components/schemas/ReportData'
 *       400:
 *         description: Bad request, invalid data or missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - reportedUserId
 *         - chatId
 *         - report
 *       properties:
 *         reportedUserId:
 *           type: string
 *           description: The ID of the user being reported
 *           example: '60c72b2f9eb1d8a8b8b5a33e'
 *         chatId:
 *           type: string
 *           description: The ID of the chat where the incident occurred
 *           example: '5f8d0d55b54764421b7165f1'
 *         report:
 *           type: string
 *           description: Description of the reported issue or behavior
 *           example: 'Offensive language used in chat.'
 *     ReportData:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the report
 *           example: '5f8d0d55b54764421b7165f2'
 *         userId:
 *           type: string
 *           description: The ID of the user who reported
 *           example: '60c72b2f9eb1d8a8b8b5a33e'
 *         reportedUserId:
 *           type: string
 *           description: The ID of the user being reported
 *           example: '60c72b2f9eb1d8a8b8b5a33d'
 *         chatId:
 *           type: string
 *           description: The chat ID related to the report
 *           example: '5f8d0d55b54764421b7165f1'
 *         report:
 *           type: string
 *           description: The message describing the report
 *           example: 'Offensive language used in chat.'
 *         createdAt:
 *           type: string
 *           description: Timestamp of when the report was created
 *           example: '2024-12-09T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           description: Timestamp of when the report was last updated
 *           example: '2024-12-09T12:00:00Z'
 */

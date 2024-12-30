const router = require('express').Router();
const controller = require('../../../controllers/model/withdraw.controller');
router.use(auth('model'));
const validationSchema = require('../../../validators/model/withdraw.validator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

router.use(auth('model'));

router.post(
  '/request',
  validator.body(validationSchema.withdrawValidation),
  controller.withdrawRequest,
);

router.get(
  '/view/:limit/:page',
  validator.params(validationSchema.pagination),
  controller.getTransactionList,
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Withdraw
 *     description: Operations related to withdraw requests and transactions
 */

/**
 * @swagger
 * /model/withdraw/request:
 *   post:
 *     summary: Request a withdrawal
 *     tags: [Withdraw]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WithdrawRequest'
 *     responses:
 *       200:
 *         description: Withdraw request successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Withdraw requested successfully'
 *                 withdrawData:
 *                   $ref: '#/components/schemas/TransactionData'
 *       400:
 *         description: Bad request due to invalid or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /model/withdraw/view/{limit}/{page}:
 *   get:
 *     summary: Get a list of withdrawal transactions with pagination
 *     tags: [Withdraw]
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: string
 *         description: Number of items per page
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *         description: Page number to view
 *       - in: query
 *         name: fromDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering transactions (optional)
 *       - in: query
 *         name: toDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering transactions (optional)
 *     responses:
 *       200:
 *         description: A list of withdrawal transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TransactionData'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalResults:
 *                   type: integer
 *                   example: 50
 *       404:
 *         description: No transaction data found for the given parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WithdrawRequest:
 *       type: object
 *       required:
 *         - bankId
 *         - amount
 *       properties:
 *         bankId:
 *           type: string
 *           description: The bank ID associated with the withdrawal
 *           example: '5f8d0d55b54764421b7165f1'
 *         amount:
 *           type: string
 *           description: The amount to be withdrawn
 *           example: '100.00'
 *         status:
 *           type: string
 *           description: The status of the transaction (optional)
 *           example: 'pending'
 *         type:
 *           type: string
 *           description: Type of the transaction (optional)
 *           example: 'withdraw'
 *         transactionId:
 *           type: string
 *           description: The unique transaction ID (optional)
 *           example: 'TXN123456'
 *         paidByUserId:
 *           type: string
 *           description: The ID of the user who made the payment (optional)
 *           example: '5f8d0d55b54764421b7165f1'
 *     TransactionData:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the transaction
 *           example: '5f8d0d55b54764421b7165f1'
 *         userId:
 *           type: string
 *           description: The user ID requesting the withdrawal
 *           example: '5f8d0d55b54764421b7165f1'
 *         bankId:
 *           type: string
 *           description: The bank ID associated with the transaction
 *           example: '5f8d0d55b54764421b7165f1'
 *         amount:
 *           type: string
 *           description: The amount of the withdrawal
 *           example: '100.00'
 *         status:
 *           type: string
 *           description: The status of the withdrawal (e.g., 'pending', 'approved')
 *           example: 'pending'
 *         type:
 *           type: string
 *           description: The type of transaction (withdrawal or deposit)
 *           example: 'withdraw'
 *         transactionId:
 *           type: string
 *           description: The unique transaction ID
 *           example: 'TXN123456'
 *         createdAt:
 *           type: string
 *           description: Timestamp of when the transaction was created
 *           example: '2024-12-09T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           description: Timestamp of when the transaction was last updated
 *           example: '2024-12-09T12:00:00Z'
 *     PaginationParams:
 *       type: object
 *       properties:
 *         limit:
 *           type: string
 *           description: The number of items per page
 *           example: '10'
 *         page:
 *           type: string
 *           description: The current page of the transaction list
 *           example: '1'
 *         fromDate:
 *           type: string
 *           format: date
 *           description: The start date for filtering transactions (optional)
 *           example: '2024-01-01'
 *         toDate:
 *           type: string
 *           format: date
 *           description: The end date for filtering transactions (optional)
 *           example: '2024-12-31'
 */

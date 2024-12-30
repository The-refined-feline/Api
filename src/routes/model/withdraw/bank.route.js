const router = require('express').Router();
const controller = require('../../../controllers/model/bank.controller');
router.use(auth('model'));
const validationSchema = require('../../../validators/model/bank.validator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

router.post(
  '/add',
  validator.body(validationSchema.bankValidator),
  controller.addBank,
);

router.get('/', controller.listBank);

router.get(
  '/edit/:id',
  validator.params(validationSchema.singleId),
  controller.editBank,
);

router.patch(
  '/update/:id',
  validator.params(validationSchema.singleId),
  validator.body(validationSchema.bankValidator),
  controller.updateBank,
);

router.delete(
  '/delete/:id',
  validator.params(validationSchema.singleId),
  controller.deleteBank,
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Bank
 *     description: Operations related to bank information management
 */

/**
 * @swagger
 * /model/bank/add:
 *   post:
 *     summary: Add a new bank account
 *     tags: [Bank]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bank'
 *     responses:
 *       200:
 *         description: Successfully added a bank account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bankData:
 *                   $ref: '#/components/schemas/BankData'
 *       400:
 *         description: Bad request due to invalid or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /model/bank:
 *   get:
 *     summary: List all bank accounts
 *     tags: [Bank]
 *     responses:
 *       200:
 *         description: A list of all bank accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BankData'
 *       404:
 *         description: No bank accounts found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /model/bank/edit/{id}:
 *   get:
 *     summary: Get a specific bank account by ID
 *     tags: [Bank]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the bank account to edit
 *     responses:
 *       200:
 *         description: The bank account details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BankData'
 *       404:
 *         description: Bank account not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /model/bank/update/{id}:
 *   patch:
 *     summary: Update a specific bank account by ID
 *     tags: [Bank]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the bank account to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bank'
 *     responses:
 *       200:
 *         description: Successfully updated the bank account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Bank updated successfully'
 *                 BankData:
 *                   $ref: '#/components/schemas/BankData'
 *       400:
 *         description: Bad request due to invalid or missing fields
 *       404:
 *         description: Bank account not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /model/bank/delete/{id}:
 *   delete:
 *     summary: Delete a specific bank account by ID
 *     tags: [Bank]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the bank account to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the bank account
 *       404:
 *         description: Bank account not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Bank:
 *       type: object
 *       required:
 *         - accountHolderName
 *         - accountNumber
 *         - accountHolderAddress
 *         - bankName
 *         - bankAddress
 *         - bankState
 *         - bankCity
 *         - routingNumber
 *       properties:
 *         accountHolderName:
 *           type: string
 *           description: Name of the account holder
 *           example: 'John Doe'
 *         accountNumber:
 *           type: string
 *           description: Bank account number (numeric)
 *           example: '1234567890'
 *         accountHolderAddress:
 *           type: string
 *           description: Address of the account holder
 *           example: '1234 Elm Street, Springfield, IL'
 *         bankName:
 *           type: string
 *           description: Name of the bank
 *           example: 'Bank of Springfield'
 *         bankAddress:
 *           type: string
 *           description: Address of the bank
 *           example: '5678 Oak Avenue, Springfield, IL'
 *         bankState:
 *           type: string
 *           description: The state where the bank is located
 *           example: 'Illinois'
 *         bankCity:
 *           type: string
 *           description: The city where the bank is located
 *           example: 'Springfield'
 *         routingNumber:
 *           type: string
 *           description: The routing number of the bank
 *           example: '021000021'
 *     BankData:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the bank account
 *           example: '5f8d0d55b54764421b7165f1'
 *         accountHolderName:
 *           type: string
 *           description: Name of the account holder
 *           example: 'John Doe'
 *         accountNumber:
 *           type: string
 *           description: Bank account number (numeric)
 *           example: '1234567890'
 *         accountHolderAddress:
 *           type: string
 *           description: Address of the account holder
 *           example: '1234 Elm Street, Springfield, IL'
 *         bankName:
 *           type: string
 *           description: Name of the bank
 *           example: 'Bank of Springfield'
 *         bankAddress:
 *           type: string
 *           description: Address of the bank
 *           example: '5678 Oak Avenue, Springfield, IL'
 *         bankState:
 *           type: string
 *           description: The state where the bank is located
 *           example: 'Illinois'
 *         bankCity:
 *           type: string
 *           description: The city where the bank is located
 *           example: 'Springfield'
 *         routingNumber:
 *           type: string
 *           description: The routing number of the bank
 *           example: '021000021'
 *         createdAt:
 *           type: string
 *           description: The date when the bank account was created
 *           example: '2024-12-09T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           description: The date when the bank account was last updated
 *           example: '2024-12-09T12:00:00Z'
 */

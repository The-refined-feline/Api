const router = require('express').Router();
const controller = require('../../controllers/admin/faq.controller');
const auth = require('../../middlewares/auth.middleware');
const validationSchema = require('../../validators/admin/faq.validation');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

router.use(auth('admin'));

router.post(
  '/list/:page/:limit',
  controller.listFaq,
);

router.post(
  '/add-faq',
  validator.body(validationSchema.faq),
  controller.addFaq,
);
router.get(
  '/get-faq/:id',
  validator.params(validationSchema.singleId),
  controller.getFaq,
);
router.patch(
  '/update-faq/:id',
  validator.body(validationSchema.faq),
  validator.params(validationSchema.singleId),
  controller.updateFaq,
);
router.delete(
  '/delete-faq/:id',
  validator.params(validationSchema.singleId),
  controller.deleteFaq,
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Admin FAQ
 *   description: API for managing FAQ (Frequently Asked Questions) by admin
 */

/**
 * @swagger
 * /admin/faq/add-faq:
 *   post:
 *     summary: Add a new FAQ
 *     tags: [Admin FAQ]
 *     description: Allows an admin to add a new FAQ with a question and answer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question for the FAQ
 *               answer:
 *                 type: string
 *                 description: The answer for the FAQ
 *             required:
 *               - question
 *               - answer
 *     responses:
 *       200:
 *         description: FAQ added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid data provided
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/faq/get-faq/{id}:
 *   get:
 *     summary: Get a specific FAQ by ID
 *     tags: [Admin FAQ]
 *     description: Retrieve a specific FAQ by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the FAQ to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: FAQ retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/faq/update-faq/{id}:
 *   patch:
 *     summary: Update an existing FAQ
 *     tags: [Admin FAQ]
 *     description: Update the question and/or answer of an FAQ by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the FAQ to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The updated question for the FAQ
 *               answer:
 *                 type: string
 *                 description: The updated answer for the FAQ
 *             required:
 *               - question
 *               - answer
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedData:
 *                   type: object
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/faq/delete-faq/{id}:
 *   delete:
 *     summary: Delete an FAQ by ID
 *     tags: [Admin FAQ]
 *     description: Delete a specific FAQ by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the FAQ to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Internal server error
 */

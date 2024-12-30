const router = require('express').Router();
const validationSchema = require('../../validators/filter.validator')
const validator = require('express-joi-validation').createValidator({
    passError: true,
});
const Controller = require('../../controllers/filter/filter.controller')
const auth = require('../../middlewares/auth.middleware');

router.use(auth('admin'));


/**
 * @swagger
 * tags:
 *   name: Filters
 *   description: API endpoints for managing filters
 */

/**
 * @swagger
 * /admin/filter/add-filter:
 *   post:
 *     summary: Add a new filter
 *     tags: [Filters]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddFilter'
 *     responses:
 *       201:
 *         description: Filter added successfully
 *       400:
 *         description: Validation error
 */
router.post(
    '/add-filter',
    validator.body(validationSchema.addFilter),
    Controller.createControllerFilter
)

/**
 * @swagger
 * /admin/filter/get-filter/{id}:
 *   get:
 *     summary: Get a filter by ID
 *     tags: [Filters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The filter ID
 *     responses:
 *       200:
 *         description: Filter retrieved successfully
 *       404:
 *         description: Filter not found
 */
router.get(
    '/get-filter/:id',
    Controller.getControllerFilterById
)


/**
 * @swagger
 * /admin/filter/get-filter-types:
 *   get:
 *     summary: Get unique filter types
 *     tags: [Filters]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Unique filter types retrieved successfully
 */
router.get(
    '/get-filter-types',
    Controller.getControllerUnickTypes
)


/**
 * @swagger
 * /admin/filter/get-filter-names/{type}:
 *   get:
 *     summary: Get filter names by type
 *     tags: [Filters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The filter type
 *     responses:
 *       200:
 *         description: Filter names retrieved successfully
 */
router.get(
    '/get-filter-names/:type',
    Controller.getDataByType
)

/**
 * @swagger
 * /admin/filter/update-filter/{id}:
 *   patch:
 *     summary: Update a filter
 *     tags: [Filters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The filter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFilter'
 *     responses:
 *       200:
 *         description: Filter updated successfully
 *       404:
 *         description: Filter not found
 */
router.patch(
    '/update-filter/:id',
    validator.body(validationSchema.updateFilter),
    Controller.updateControllerFilter
)

/**
 * @swagger
 * /admin/filter/delete-filter/{id}:
 *   delete:
 *     summary: Delete a filter
 *     tags: [Filters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The filter ID
 *     responses:
 *       200:
 *         description: Filter deleted successfully
 *       404:
 *         description: Filter not found
 */
router.delete(
    '/delete-filter/:id',
    Controller.deleteControllerFilter
)


module.exports = router;
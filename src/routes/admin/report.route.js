const router = require('express').Router();
const controller = require('../../controllers/admin/report.controller');

router.use(auth('admin', true));

router.get('/get', controller.viewReport);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Admin Report
 *   description: API for managing and viewing user reports
 */

/**
 * @swagger
 * /admin/report/get:
 *   get:
 *     summary: View all user reports
 *     tags: [Admin Report]
 *     description: Fetches a list of all reports made by users, including details of the reporting user and the reported user.
 *     responses:
 *       200:
 *         description: Report data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reportData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       chatId:
 *                         type: string
 *                         description: The chat ID where the report was made
 *                       report:
 *                         type: string
 *                         description: The content of the report
 *                       userDetails:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The ID of the user who made the report
 *                           fullName:
 *                             type: string
 *                             description: The full name of the reporting user
 *                           role:
 *                             type: string
 *                             description: The role of the reporting user
 *                       reportedUserDetails:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The ID of the reported user
 *                           fullName:
 *                             type: string
 *                             description: The full name of the reported user
 *                           role:
 *                             type: string
 *                             description: The role of the reported user
 *       500:
 *         description: Internal server error
 */

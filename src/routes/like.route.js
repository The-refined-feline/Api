const router = require('express').Router();
const controller = require('../controllers/like.controller');
const validationSchema = require('../validators/like.validator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

router.use(auth('', true));

router.post('/', validator.body(validationSchema.addLike), controller.addLike);

router.get('/iliked', controller.iLiked);

router.get('/who-liked-me', controller.whoLikedMe);

router.delete(
  '/delete/:id',
  validator.params(validationSchema.singleId),
  controller.deleteLike,
);
module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Like
 *     description: Operations related to liking users
 */

/**
 * @swagger
 * /like/:
 *   post:
 *     summary: Add a like for a user
 *     tags: [Like]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddLike'
 *     responses:
 *       200:
 *         description: Liked the user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Liked'
 *                 likeData:
 *                   $ref: '#/components/schemas/Like'
 *       400:
 *         description: Already liked this user or invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /like/iliked:
 *   get:
 *     summary: Get users that the authenticated user has liked
 *     tags: [Like]
 *     responses:
 *       200:
 *         description: Successfully retrieved users the authenticated user has liked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 iLikedData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LikedUser'
 *       404:
 *         description: No liked users found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /like/who-liked-me:
 *   get:
 *     summary: Get users who have liked the authenticated user
 *     tags: [Like]
 *     responses:
 *       200:
 *         description: Successfully retrieved users who have liked the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LikedUser'
 *       404:
 *         description: No one has liked you yet
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /like/delete/{id}:
 *   delete:
 *     summary: Delete a like by ID
 *     tags: [Like]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the like to delete
 *     responses:
 *       200:
 *         description: Successfully removed the like
 *       404:
 *         description: Like not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddLike:
 *       type: object
 *       required:
 *         - iLikedWhom
 *       properties:
 *         iLikedWhom:
 *           type: string
 *           description: The user ID of the person being liked
 *           example: '60c72b2f9eb1d8a8b8b5a33e'
 *     Like:
 *       type: object
 *       properties:
 *         myId:
 *           type: string
 *           description: The ID of the user who liked someone
 *           example: '60c72b2f9eb1d8a8b8b5a33e'
 *         iLikedWhom:
 *           type: string
 *           description: The ID of the user who was liked
 *           example: '60c72b2f9eb1d8a8b8b5a33d'
 *     LikedUser:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who liked
 *           example: '60c72b2f9eb1d8a8b8b5a33e'
 *         fullName:
 *           type: string
 *           description: Full name of the user
 *           example: 'John Doe'
 *         profileimageurl:
 *           type: string
 *           description: URL of the user's profile image
 *           example: 'https://example.com/profile.jpg'
 *         location:
 *           type: string
 *           description: The location of the user
 *           example: 'New York, USA'
 */

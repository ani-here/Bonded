import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
const router = express.Router();

/**
 * @swagger
 * /api/authenticate:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticate a user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Invalid email or password
 */
router.route("/authenticate").post(authController.authenticate);

router.use(authController.protect);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user details
 *     description: Get details of the authenticated user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */
router.route("/user").get(userController.getUser);

/**
 * @swagger
 * /api/follow/{id}:
 *   post:
 *     summary: Follow a user
 *     description: Follow another user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *       400:
 *         description: Cannot follow yourself or already following
 *       404:
 *         description: User not found
 */
router.route("/follow/:id").post(userController.followUser);

/**
 * @swagger
 * /api/unfollow/{id}:
 *   post:
 *     summary: Unfollow a user
 *     description: Unfollow a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user
 *       400:
 *         description: Cannot unfollow yourself or not following
 *       404:
 *         description: User not found
 */
router.route("/unfollow/:id").post(userController.unFollowUser);

export { router };
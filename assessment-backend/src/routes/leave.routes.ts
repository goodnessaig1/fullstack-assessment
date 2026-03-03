import { Router } from "express";
import { LeaveController } from "../controllers/leave.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { UserRole } from "../enums/user.enum";
import {
  createLeaveSchema,
  respondLeaveSchema,
} from "../validations/leave.schema";

const router = Router();

/**
 * @swagger
 * /api/leave/my-requests:
 *   get:
 *     summary: Get logged-in user's leave requests
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of user leaves
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LeaveRequest'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems: { type: integer, example: 50 }
 *                     totalPages: { type: integer, example: 5 }
 *                     currentPage: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 10 }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/my-requests", authenticate, LeaveController.getMyLeaves);

/**
 * @swagger
 * /api/leave/all-requests:
 *   get:
 *     summary: Admin/Principal fetch all leave requests
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Master list of all leaves
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LeaveRequest'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems: { type: integer, example: 50 }
 *                     totalPages: { type: integer, example: 5 }
 *                     currentPage: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 10 }
 *       403:
 *         description: Forbidden
 */
router.get(
  "/all-requests",
  authenticate,
  authorizeRoles(UserRole.PRINCIPAL),
  LeaveController.getAllLeaves,
);

/**
 * @swagger
 * /api/leave:
 *   post:
 *     summary: Submit a new leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLeaveInput'
 *     responses:
 *       201:
 *         description: Leave request successfully submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data:
 *                   $ref: '#/components/schemas/LeaveRequest'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post(
  "/",
  authenticate,
  validate(createLeaveSchema),
  LeaveController.submitLeave,
);

/**
 * @swagger
 * /api/leave/{id}/respond:
 *   put:
 *     summary: Approve or decline a leave request (Admin/Principal only)
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the leave request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RespondLeaveInput'
 *     responses:
 *       200:
 *         description: Status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data:
 *                   $ref: '#/components/schemas/LeaveRequest'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:id/respond",
  authenticate,
  authorizeRoles(UserRole.PRINCIPAL),
  validate(respondLeaveSchema),
  LeaveController.respondToLeave,
);

export default router;

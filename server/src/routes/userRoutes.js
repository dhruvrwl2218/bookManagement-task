import { Router } from "express";
import { allUsers,addUser } from "../controllers/userController.js";

const router = Router();

router.route('/allUser').get(allUsers);
router.route('/addUser').post(addUser);
export default router;
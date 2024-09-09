import { Router } from "express";
import { allUsers } from "../controllers/userController.js";

const router = Router();

router.route('/allUser').get(allUsers);

export default router;


// router.route('/addUser').post(addUser);..,addUser
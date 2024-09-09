import { Router } from "express";
import { allBooks,filteredBookData } from "../controllers/bookController.js";

const router = Router();

router.route('/allBooks').get(allBooks);
// router.route('/addbooks').post(addbook),addbook
//filtred book data
router.route('/SearchBook').get(filteredBookData);

export default router;        
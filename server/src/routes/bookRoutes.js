import { Router } from "express";
import { allBooks,filteredBookData } from "../controllers/bookController.js";

const router = Router();

router.route('/allBooks').get(allBooks);

//filtred book data
router.route('/SearchBook').get(filteredBookData);

export default router;       
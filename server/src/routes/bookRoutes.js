import { Router } from "express";
import { allBooks,filteredBookData,addbook } from "../controllers/bookController.js";

const router = Router();

router.route('/allBooks').get(allBooks);

//filtred book data

router.route('/SearchBook').get(filteredBookData);
router.route('/addBooks').post(addbook);
export default router;       
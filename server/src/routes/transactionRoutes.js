import { Router } from "express";
import { issueBook,returnBook,bookPageInfo,totalRentByBook,userIssuedBooks,sortByDate } from "../controllers/transactionController.js";

const router = Router();

router.route('/issueBook').post(issueBook);
router.route('/returnBook').put(returnBook);
router.route('/bookPageInfo').get(bookPageInfo);
router.route('/totalBookRent').get(totalRentByBook);
router.route('/UserIssuse').get(userIssuedBooks);
router.route('/sortBydates').get(sortByDate);
export default router;
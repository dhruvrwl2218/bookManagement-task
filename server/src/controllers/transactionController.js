import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  issueBookService,
  returnBookService,
  getBookPageInfoService,
  getTotalRentByBookService,
  getUserIssuedBooksService,
  getTransactionsByDateRange,
} from "../services/transactionalservices.js";

//issueTransaction
export const issueBook = asyncHandler(async (req, res, next) => {
  try {
    const { bookName, user_id, issueDate } = req.body;
    if (!bookName || !user_id) {
      throw new ApiError(400, "plz provide all the values");
    }
    const issue = await issueBookService(bookName, user_id, issueDate);

    res.status(200).json(new ApiResponse(200, "Book has been issued", issue));
  } catch (error) {
    next(error);
  }
});

//returnTransaction
export const returnBook = asyncHandler(async (req, res, next) => {
  try {
    const { bookName, user_id, returnDate } = req.body;

    if (!bookName || !user_id) {
      throw new ApiError(400, "Book name and user ID are required.");
    }

    // Call the service function
    const transaction = await returnBookService(bookName, user_id, returnDate);

    // Respond with the updated transaction data
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Transaction complete, book has been returned",
          transaction
        )
      );
  } catch (error) {
    next(error);
  }
});

//multiple info related to book
export const bookPageInfo = asyncHandler(async (req, res, next) => {
  const { bookName } = req.body;

  try {
    if (!bookName) {
      throw new ApiError(400, "Book name is required.");
    }

    // Call the service function
    const bookInfo = await getBookPageInfoService(bookName);

    // Respond with the book information
    res
      .status(200)
      .json(new ApiResponse(200, bookInfo, "Here is all the book info"));
  } catch (error) {
    // Pass the error to the next middleware (error handler)
    next(error);
  }
});

//total rent genrated by any book 
export const totalRentByBook = asyncHandler(async (req, res, next) => {
  const { bookName } = req.body;

  try {
    const totalRentGenerated = await getTotalRentByBookService(bookName);
    res
      .status(200)
      .json(new ApiResponse(200, totalRentGenerated, "Total rent fetched"));
  } catch (error) {
    next(error);
  }
});

//list of books issued by user
export const userIssuedBooks = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  try {
    const resData = await getUserIssuedBooksService(userId);
    res.status(200).json(new ApiResponse(200, resData, "User issued books"));
  } catch (error) {
    next(error); // Pass error to global error handler
  }
});

//transaction sorted by date range
export const sortByDate = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.body;

  try {
    if (!startDate || !endDate) {
      throw new ApiError(400, "Both start and end dates must be provided.");
    }

    const transactions = await getTransactionsByDateRange(startDate, endDate);
    res
      .status(200)
      .json(new ApiResponse(200, transactions, "Books issued by date range"));
  } catch (error) {
    next(error); // Pass error to global error handler
  }
});

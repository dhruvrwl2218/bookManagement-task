import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import {
  validateTransaction,
  validateUserAndBook,
  checkBookAvailability,
  calculateDays,
  getBookId,
} from "../services/transactionalService/transactional.services.js";

export const issueBook = asyncHandler(async (req, res, next) => {
  try {
    const { bookName, user_id, issueDate } = req.body;

    if (!bookName || !user_id) {
      throw new ApiError(400, "plz provide all the values");
    }
    //confirm here book and user is there in there respective db collection checking valid or not and getting the bookID
    const { userId, bookId } = await validateUserAndBook(user_id, bookName);
    //check status of the book is avilable or already issued to someone
    await checkBookAvailability(bookId);
    //after checks book is issued to user
    const transaction = new Transaction({
      issuedBy: userId,
      issuedBook: bookId,
      issueDate: issueDate,
      status: "Issued",
    });
    const issue = await transaction.save();
    res.status(200).json(new ApiResponse(200, "book has been Issued", issue));
  } catch (error) {
    next(error);
  }
});

export const returnBook = asyncHandler(async (req, res, next) => {
  try {
    const { bookName, user_id, returnDate } = req.body;

    if (!bookName || !user_id) {
      throw new ApiError(400, "query data is missing");
    }
    // not essentially needed but just checking for higher security
    const { userId, bookId, rent } = await validateUserAndBook(
      user_id,
      bookName
    );

    //here we're checking is there transaction with status issued in the db
    const transaction = await validateTransaction(userId, bookId);

    //generate your own date here for real use cases
    const currDate = returnDate;

    const totalDays = await calculateDays(transaction.issueDate, currDate);

    const totalrent = totalDays * rent;

    transaction.returnDate = currDate;
    transaction.rent = totalrent;
    transaction.status = "Returned";

    const data = await transaction.save();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "transaction complete,book has been returned",
          data
        )
      );
  } catch (error) {
    next(error);
  }
});

export const bookPageInfo = asyncHandler(async (req, res, next) => {
  const { bookName } = req.body;

  try {
    const bookId = await getBookId(bookName);

    //all the user who have rented the particular book
    const allPastTransactions = await Transaction.find({
      issuedBook: bookId,
      status: "Returned",
    })
      .populate("issuedBy", "userName _id")
      .exec();

    //  User who have currently rented or available status
    const currentStatus = await Transaction.find({
      issuedBook: bookId,
      status: "Issued",
    }).populate("issuedBy", "userName _id");

    const pastBorrowers = allPastTransactions.map((transaction) => ({
      userId: transaction.issuedBy._id,
      userName: transaction.issuedBy.userName,
      issueDate: transaction.issueDate,
      returnDate: transaction.returnDate,
    }));

    const RentalCount = pastBorrowers.length;

    const bookStatus = {};

    if (currentStatus) {
      bookStatus.status = "Not available";
      bookStatus.RentedBy = currentStatus[0].issuedBy.userName; //as we know there will always be one Issuer to issue/rent the book
      bookStatus.issueData = currentStatus[0].issueDate;
    } else {
      bookStatus.status = "Available";
    }

    const responseData = {
      pastBorrowers,
      RentalCount,
      bookStatus,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "here is all the book info"));
  } catch (error) {
    next(error);
  }
});

export const totalRentByBook = asyncHandler(async (req, res, next) => {
  const { bookName } = req.body;
  try {
    const bookId = await getBookId(bookName);

    const transaction = await Transaction.find({
      issuedBook: bookId,
      status: "Returned",
      rent: { $ne: null },
    }).exec();

    const totalRentGenerated = transaction.reduce(
      (sum, transaction) => sum + (transaction.rent || 0),
      0
    );
    res
      .status(200)
      .json(new ApiResponse(200, totalRentGenerated, "total rent fetched"));
  } catch (error) {
    next(error);
  }
});

export const userIssuedBooks = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  try {
    const totalIssued = await Transaction.find({
      issuedBy: userId,
    }).populate("issuedBook", "bookName");

    const resData = totalIssued.map((transaction) => ({
      userId: transaction.issuedBook._id,
      userName: transaction.issuedBook.bookName,
      issueDate: transaction.issueDate,
      returnDate: transaction.returnDate,
    }));
    console.log(resData);
    res.status(200).json(new ApiResponse(200, resData, "user issued books"));
  } catch (error) {
    next(error);
  }
});

export const sortByDate = asyncHandler(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      throw new ApiError(409, "both start and end should be provided");
    }
    console.log("rec:", startDate, endDate);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the parsed dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Please use YYYY-MM-DD format." });
    }
    end.setHours(23, 59, 59, 999);

    const transactions = await Transaction.find({
      issueDate: { $gte: start, $lte: end },
    })
      .populate("issuedBook", "BookName")
      .populate("issuedBy", "userName")
      .exec();

    const result = transactions.map((transaction) => ({
      bookName: transaction.issuedBook.bookName,
      issuedTo: transaction.issuedBy.userName,
      issueDate: transaction.issueDate,
    }));

    res.status(200).json(new ApiResponse(200, result, "books issued by range"));
  } catch (error) {
    next(error);
  }
});

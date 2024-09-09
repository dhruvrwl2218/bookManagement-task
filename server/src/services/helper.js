import { User } from "../models/user.model.js";
import { Books } from "../models/book.model.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utils/apiError.js";

//this one is used to check is user and book is there or not in db while issuing the book
export const validateUserAndBook = async (_id, bookName) => {
  const user = await User.findById(_id);
  const book = await Books.findOne({ bookName: bookName });

  if (!user) {
    throw new ApiError(409, "no user in db with this userId");
  }
  if (!book) {
    throw new ApiError(409, "no book in db with this name");
  }

  const userId = user._id.toString();
  const bookId = book._id.toString();

  const rent = book.rent; // for return transaction
  return { userId, bookId, rent };
};

//checks for the issue status is there before committing the return
export const validateTransaction = async (userId, bookId) => {
  // console.log("while check",userId,bookId)
  const transaction = await Transaction.findOne({
    issuedBook: bookId,
    issuedBy: userId,
    status: "Issued",
  });

  if (!transaction) {
    throw new ApiError(409, "unable to find the transaction");
  }

  return transaction;
};

//checks is book is already issued or not
export const checkBookAvailability = async (bookId) => {
  const ongoingTransaction = await Transaction.findOne({
    issuedBook: bookId,
    status: "Issued",
  });

  if (ongoingTransaction) {
    throw new ApiError(409, "already issued to someone");
  }
  // console.log("no ongoing trans..", ongoingTransaction);
  return true;
};

//calculates the diff between the issue and return date
export const calculateDays = async (issueDate, returnDate) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const issueD = new Date(issueDate);
  const returnD = new Date(returnDate);

  const timeDiff = returnD - issueD;
  const diffIndays = Math.round(timeDiff / oneDay);

  return diffIndays;
};

//it was used becoz task demanded otherwise we mostly deals with the _id's
export const getBookId = async (bookName) => {
  const book = await Books.findOne({ bookName: bookName });

  if (!book) {
    throw new ApiError(409, "No book is registred with this name");
  }
  const bookId = book._id.toString();

  return bookId;
};

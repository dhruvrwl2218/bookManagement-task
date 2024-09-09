import { ApiError } from "../utils/apiError.js";
import { Books } from "../models/book.model.js";


export const getFilteredBooks = async (filters) => {
    try {
      const { name, maxRent, minRent, category } = filters;
      const query = {};
  
      if (name) {
        query.bookName = { $regex: name, $options: "i" };
      }
  
      if (minRent && maxRent) {
        const min = parseFloat(minRent) || 0;
        const max = parseFloat(maxRent) || Number.MAX_SAFE_INTEGER;
  
        if (isNaN(min) || isNaN(max)) {
          throw new ApiError(400, "Invalid rent range values");
        }
  
        query.rent = { $gte: min, $lte: max };
      }
  
      if (category) {
        query.category = { $regex: new RegExp(`^${category}$`, "i") };
      }
  
      const books = await Books.find(query);
      if (books.length === 0) {
        throw new ApiError(404, "No books found matching the criteria");
      }
      return books;
    } catch (error) {
      // Handle errors, log them, or rethrow with additional context
      throw new ApiError(error.statusCode ? error.statusCode : 500, error.message ? error.message : "unable to filter books");
    }
  };

  export const getAllBooks = async () => {
    try {
      const books = await Books.find();
      if (books.length === 0) {
        throw new ApiError(409, "Books collection is empty");
      }
      return books;
    } catch (error) {
      // You may want to log the error or perform other actions
      throw new ApiError(500, "An error occurred while fetching books");
    }
  };
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Books } from "../models/book.model.js";
import { getFilteredBooks ,getAllBooks} from "../services/userServices.js";


  export const allBooks = asyncHandler(async (req, res, next) => {
    try {
      const books = await getAllBooks();
      res.status(200).json(new ApiResponse(200, books, "Books list fetched"));
    } catch (error) {
      next(error);
    }
  });

// //filtred book data

export const filteredBookData = asyncHandler(async (req, res, next) => {
  try {
    const filters = req.query;
    const books = await getFilteredBooks(filters);
    res.status(200).json(new ApiResponse(200, books, "Filtered book data"));
  } catch (error) {
    next(error);
  }
});
// export const filteredBookData = asyncHandler(async (req, res, next) => {
//  try {
//     const { name, maxRent, minRent, category } = req.query;
//     console.log("query data :", name, maxRent, minRent, category);
//     console.log(req.query);
//     const query = {};
//     if (name) {
//       query.bookName = { $regex: name, $options: "i" };
//     }
  
//     if (minRent && maxRent) {
//       // Ensure minRent and maxRent are parsed as floats
//       const min = minRent ? parseFloat(minRent) : 0; // Default minRent to 0 if not provided
//       const max = maxRent ? parseFloat(maxRent) : Number.MAX_SAFE_INTEGER; // Default maxRent to a very high number if not provided


  
//       if (isNaN(min) || isNaN(max)) {
//         throw new ApiError(400, "Invalid rent range values");
//       }
//       //   if (min > max) {
//       //     throw new ApiError(400, "Min rent cannot be greater than max rent");
//       //   } // we are not handling as range is mostly filtered with in the given selectbox which is decided by programmer in case if it is given by user we can put this check
  
//       query.rent = { $gte: min, $lte: max };
//     }
//     if (category) {
//       // query.category = category;                                  //if you want wxact type then this
//       query.category = { $regex: new RegExp(`^${category}$`, "i") }; // in case of realted and search result with insensative check on string
//     }
//     // Querying the database with the constructed query, or returning all books if no filters are applied
//     const books = await Books.find(query);
//     // console.log('filtered Book data :',books)
//     if (books.length === 0) {
//       throw new ApiError(404, "No books found matching the criteria");
//     }
  
//     res.status(200).json(new ApiResponse(200, books, "filtered book data"));
//  } catch (error) {
//     next(error)
//  }
// });


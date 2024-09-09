import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Books } from "../models/book.model.js";
import { getFilteredBooks ,getAllBooks} from "../services/bookServices.js";


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


// export const addbook = asyncHandler(async(req,res,next)=>{
//   try {
//     const body = req.body;
    
//     const newbook = new Books({
//       bookName : body.bookName,
//       rent : body.rent,
//       category: body.category
//     })
//     const book = newbook.save();
//     res.status(200).json(new ApiResponse(200,book))
//     console.log(body)
//   } catch (error) {
//     next(error)
//   }
// })
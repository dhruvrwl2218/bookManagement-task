import mongoose, { Schema } from "mongoose";

const categoryEnum = [
  "Fiction",
  "Dystopian",
  "Romance",
  "Adventure",
  "Historical",
  "Fantasy",
  "Crime",
  "Philosophy",
  "Post-Apocalyptic",
  "Horror",
  "Drama",
  "Non-Fiction",
  "Memoir",
  "Thriller",
  "Biography",
  "Science Fiction"
];
// here instead of array we can also have category schema where user can add more genre with addable select
//  box but as we not dealing with adding the new books that's why we are maining limited options with array

const BookSchema = new Schema({
  bookName: {
    type: String, 
    required: true,
    trim: true,
  },
  rent: {
    //per day
    type: Number,
    require: true,
    min: 0, //should not be negative in any case
  },
  category: {
    type: String,
    enum: categoryEnum,
    required: true,
  },
});

export const Books = mongoose.model("Books", BookSchema);

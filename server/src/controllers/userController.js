import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

export const allUsers = asyncHandler(async(req,res,next)=>{
    try {
        const user = await User.find();
    if(!user){
        throw new ApiError(409,"no user are there");
    }
    console.log(user)
    return res.status(200).json(new ApiResponse(200,user,'all user fetched'));
    } catch (error) {
        next(error)
    }

})
// export const addUser = asyncHandler(async(req,res,next)=>{
  //   try {
  //     const body = req.body;
      
  //     const newbook = new User({
  //       userName : body.userName,
  //     })
  //     const book = newbook.save();
  //     res.status(200).json(new ApiResponse(200,book))
  //     console.log(body)
  //   } catch (error) {
  //     next(error)
  //   }
  // })
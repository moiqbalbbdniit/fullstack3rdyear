import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async (req,res)=>{
    // get all the details of user from frontend or postman
    // validation --  there is any empty field
    // check karna hai username or email se ki user already exist to  nahi hai
    // check for images, check for avtar is required and cover image
    // upload them to cloudinary, avtar and get public link from cloudinary and store in db
    // create user object -- db me entry karni hogi create method use karke db me store ho data
    // and we get all the as it is return so we have to remove the password and refresh to not display on the frontend
    // check karege ki db me user create hua hai ki nahi 


    const {username,email,fullname,password}= req.body
    console.log("Email is: ",email);
    // validation for empty field
    if(
        [fullname,username,email,password].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }
    // checking the user existed or not
    const userExisted = User.findOne({email})
    if(userExisted){
        throw new ApiError(409,"user existed!!!")
    }
    // file store in local path
    const avatarLocalpath = req.files?.avatar[0]?.path
    const coverimageLocalpath = req.files?.coverimage[0]?.path
    if(!avatarLocalpath){
        throw new ApiError(400,"avatar is required")
    }
    
    // uploading on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalpath)
    const coverimage = await uploadOnCloudinary(coverimageLocalpath)
    if(!avatar){
        throw new ApiError(400,"avatar not uploaded")
    }
    //creating entries in database
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url|| "",
        email,
        password,
        username: username.toLowerCase()
    })
    const userisCreated = await User.findById(user._id).select("-password -refreshToken")
    if(!userisCreated){
        throw new ApiError(500,"Error While Registering")
    }
    return res.status(201).json(
        new ApiResponse(200,userisCreated,"User registered Successfully")
    )
})

export {
    registerUser
}
import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'


//configuration 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//function for uploading file on cloudinary
const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        //file upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        }) 
        // file has been uploaded successfully
        console.log("File has been Uploaded Successfully",response.url);
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }  
}

export {uploadOnCloudinary}
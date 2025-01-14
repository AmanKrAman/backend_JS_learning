import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


//configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto",
        })
        //file uploaded successfully
        // console.log("file is uploaded on cloudinary ", response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //removed the locally saved file which operation got failed
        return null
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null
        
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image" || "video"
        })
        
        return response
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error)
        return null
    }
}


export {uploadOnCloudinary , deleteFromCloudinary}
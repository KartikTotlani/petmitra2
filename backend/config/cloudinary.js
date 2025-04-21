import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

    try {
        const res = await cloudinary.api.ping(); // Check if Cloudinary connection works
        console.log('Cloudinary connected:', res);
    } catch (err) {
        console.error('Cloudinary connection failed:', err);
    }
}

export default connectCloudinary
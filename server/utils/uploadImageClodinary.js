// Cloudinary ke v2 version ko import kar rahe hain
import { v2 as cloudinary } from "cloudinary";

// Cloudinary ka configuration set kar rahe hain using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Ye ek async function hai jo image ko Cloudinary pe upload karega
const uploadImageClodinary = async (image) => {
  // image ko buffer me convert kar rahe hain taaki upload ho sake
  // agar image.buffer available hai to use le lo, warna image ko arrayBuffer se buffer banao
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  // image ko upload karne ke liye Cloudinary uploader ka stream method use kar rahe hain
  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "ecommercee" }, // Cloudinary me image kis folder me save hogi (yaha "binkit")
        (error, uploadResult) => {
          // upload ho jaane ke baad result ko return kar do
          return resolve(uploadResult); // success ke case me upload result milega
        }
      )
      .end(buffer); // image data ko stream me bhej rahe hain
  });

  // upload ka result return kar rahe hain (isme image ka URL, id, etc. hota hai)
  return uploadImage;
};

// is function ko default export kar rahe hain taaki doosre files me import karke use kiya ja sake
export default uploadImageClodinary;

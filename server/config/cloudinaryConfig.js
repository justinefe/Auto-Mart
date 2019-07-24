import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'auto-mart',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, callback) => {
    callback(undefined, 'auto-mart');
  },
});

const upload = multer({ storage });

export default upload;

import multer from 'multer';
// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';

// dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname.replace(/\s/g, ''));
  },
});

const imageFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!').toString(), false);
  }

  return cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

// const cloudinaryConfig = (req, res, next) => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
//   next();
// };

// const storageCloud = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'demo',
//   transformation: [{
//     width: 400, height: 400, crop: 'limit',
//   }],
// });

export default upload;

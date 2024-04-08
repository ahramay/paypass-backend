import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 100mb.
    fileSize: 1024 * 1024 * 1024,
  },
});

export const multerUpload = upload;

// Importing awsConfig separately
const awsConfig = {
  region: 'eu-north-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export { awsConfig };
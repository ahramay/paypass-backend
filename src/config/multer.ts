import multer from 'multer';

// Multer storage configuration
const storage = multer.memoryStorage(); // Store the file in memory

const upload = multer({ storage: storage });

export default upload;
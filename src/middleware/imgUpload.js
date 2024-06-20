import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create storage configuration for multer
const storage = multer.diskStorage({
  // Specify the destination folder where images will be saved
  destination: path.join(__dirname, "../storage/imgs"),

  // Specify the filename format
  filename: function (req, file, cb) {
    // Use a UUID to generate a unique name and preserve the file extension
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

// Configure the upload middleware
export const upload = multer({
  storage,

  // File filter to validate file type
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const filetypes = /jpeg|jpg|png|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // Check if the file type is valid
    if (mimetype && extname) {
      return cb(null, true);
    }

    // If file type is invalid, return an error message
    cb("error: The file is not valid, it must be jpeg|jpg|png|svg");
  },
});

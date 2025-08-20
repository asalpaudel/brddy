import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4001; // We use a NEW port to avoid conflicts

app.use(cors());
app.use(express.json());

// --- Image Upload Logic ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public/images');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// This is the only endpoint on this server
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Important: Return the FULL URL where the image can be accessed
  res.status(200).json({ url: `http://localhost:${port}/images/${req.file.filename}` });
});

// Make the 'public' folder accessible to the browser
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`✅ Image upload server is running on http://localhost:${port}`);
});
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Configure Multer storage in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Configure Cloudinary if env variables are available
const hasCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    // 1. If Cloudinary is configured, upload to Cloudinary
    if (hasCloudinary) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'portfolio_uploads',
        resource_type: 'image'
      });

      return res.json({
        success: true,
        url: result.secure_url,
        provider: 'cloudinary'
      });
    }

    // 2. Fallback: return data URI (instant zero-config local/serverless support)
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;

    return res.json({
      success: true,
      url: dataUri,
      provider: 'data-uri',
      message: 'Uploaded as Base64 data URI (Configure Cloudinary keys in .env for CDN hosting)'
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    res.status(500).json({ success: false, message: 'Image upload failed: ' + error.message });
  }
});

module.exports = router;

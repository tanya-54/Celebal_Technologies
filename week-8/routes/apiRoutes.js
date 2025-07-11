const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { getWeather } = require('../controllers/weatherController');

// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({
    message: 'File uploaded successfully!',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

// Weather API route
router.get('/weather', getWeather);

module.exports = router;

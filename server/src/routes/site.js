const express = require('express');
const router = express.Router();
const { getSiteData, updateSiteData, isMongoConnected } = require('../config/db');

// GET /api/site - Fetch full site content for public portfolio & admin
router.get('/', async (req, res) => {
  try {
    const data = await getSiteData();
    res.json({
      success: true,
      data,
      storage: isMongoConnected() ? 'mongodb' : 'local-storage'
    });
  } catch (error) {
    console.error('Failed to get site data:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving site data' });
  }
});

// PUT /api/site - Update site content from admin dashboard
router.put('/', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid payload' });
    }

    const updated = await updateSiteData(payload);
    res.json({
      success: true,
      message: 'Site configuration updated successfully',
      data: updated,
      storage: isMongoConnected() ? 'mongodb' : 'local-storage'
    });
  } catch (error) {
    console.error('Failed to update site data:', error);
    res.status(500).json({ success: false, message: 'Server error updating site data' });
  }
});

module.exports = router;

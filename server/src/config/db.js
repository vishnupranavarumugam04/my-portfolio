const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { DEFAULT_SITE_DATA } = require('../../../shared/siteDefaults');
const Site = require('../models/Site');

const DATA_FILE_PATH = path.join(__dirname, '../../data/site-data.json');
let isConnectedToMongo = false;
let memorySiteData = null;

// Ensure local data dir exists
const ensureDataDirectory = () => {
  const dir = path.dirname(DATA_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Load initial fallback data from disk or default
const loadFallbackData = () => {
  try {
    ensureDataDirectory();
    // Always initialize with Vishnu Pranav's updated defaults if new fields missing
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      // Merge with default schema so newly added fields (skillsCategories, achievements, etc.) are present
      memorySiteData = {
        ...DEFAULT_SITE_DATA,
        ...parsed,
        hero: { ...DEFAULT_SITE_DATA.hero, ...(parsed.hero || {}) },
        theme: { ...DEFAULT_SITE_DATA.theme, ...(parsed.theme || {}) },
        about: { ...DEFAULT_SITE_DATA.about, ...(parsed.about || {}) },
        github: { ...DEFAULT_SITE_DATA.github, ...(parsed.github || {}) },
        linkedin: { ...DEFAULT_SITE_DATA.linkedin, ...(parsed.linkedin || {}) },
        customProjects: parsed.customProjects && parsed.customProjects.length > 0 ? parsed.customProjects : DEFAULT_SITE_DATA.customProjects,
        skillsCategories: parsed.skillsCategories && parsed.skillsCategories.length > 0 ? parsed.skillsCategories : DEFAULT_SITE_DATA.skillsCategories,
        achievements: parsed.achievements && parsed.achievements.length > 0 ? parsed.achievements : DEFAULT_SITE_DATA.achievements,
        education: { ...DEFAULT_SITE_DATA.education, ...(parsed.education || {}) }
      };
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(memorySiteData, null, 2));
    } else {
      memorySiteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(memorySiteData, null, 2));
    }
  } catch (err) {
    console.warn('⚠️ [Storage] Could not read fallback file, using memory store:', err.message);
    memorySiteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
  }
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>')) {
    loadFallbackData();
    return;
  }

  if (mongoose.connection.readyState === 1) {
    isConnectedToMongo = true;
    return;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnectedToMongo = true;
    console.log('✅ [Database] Connected to MongoDB Atlas successfully.');

    // Seed default if empty
    const existing = await Site.findOne();
    if (!existing) {
      console.log('🌱 [Database] Initializing MongoDB with Vishnu Pranav portfolio content...');
      await Site.create(DEFAULT_SITE_DATA);
    }
  } catch (error) {
    console.warn(`⚠️ [Database] MongoDB connection failed (${error.message}). Falling back to local storage.`);
    isConnectedToMongo = false;
    loadFallbackData();
  }
};

const getSiteData = async () => {
  if (process.env.MONGODB_URI && mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  if (mongoose.connection.readyState === 1) {
    try {
      let doc = await Site.findOne();
      if (!doc) {
        doc = await Site.create(DEFAULT_SITE_DATA);
      }
      return doc.toObject();
    } catch (err) {
      console.error('Error fetching from Mongo, falling back:', err.message);
    }
  }

  if (!memorySiteData) {
    loadFallbackData();
  }
  return memorySiteData;
};

const updateSiteData = async (newData) => {
  if (process.env.MONGODB_URI && mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  // Sanitize payload: strip immutable fields to prevent MongoDB update rejections
  const cleanPayload = { ...newData };
  delete cleanPayload._id;
  delete cleanPayload.__v;
  delete cleanPayload.createdAt;
  delete cleanPayload.updatedAt;

  if (mongoose.connection.readyState === 1) {
    try {
      let doc = await Site.findOne();
      if (doc) {
        doc = await Site.findByIdAndUpdate(
          doc._id,
          { $set: cleanPayload },
          { new: true, runValidators: false }
        );
      } else {
        doc = await Site.create(cleanPayload);
      }
      if (doc) {
        return doc.toObject();
      }
    } catch (err) {
      console.error('Error saving to Mongo, falling back to local store:', err);
    }
  }

  // Fallback update
  if (!memorySiteData) {
    loadFallbackData();
  }
  memorySiteData = {
    ...memorySiteData,
    ...cleanPayload,
    hero: { ...memorySiteData.hero, ...(cleanPayload.hero || {}) },
    theme: { ...memorySiteData.theme, ...(cleanPayload.theme || {}) },
    about: { ...memorySiteData.about, ...(cleanPayload.about || {}) },
    github: { ...memorySiteData.github, ...(cleanPayload.github || {}) },
    linkedin: { ...memorySiteData.linkedin, ...(cleanPayload.linkedin || {}) },
    customProjects: cleanPayload.customProjects !== undefined ? cleanPayload.customProjects : (memorySiteData.customProjects || []),
    skillsCategories: cleanPayload.skillsCategories !== undefined ? cleanPayload.skillsCategories : (memorySiteData.skillsCategories || []),
    achievements: cleanPayload.achievements !== undefined ? cleanPayload.achievements : (memorySiteData.achievements || []),
    education: { ...memorySiteData.education, ...(cleanPayload.education || {}) },
    stats: cleanPayload.stats || memorySiteData.stats,
    updatedAt: new Date().toISOString()
  };

  try {
    ensureDataDirectory();
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(memorySiteData, null, 2));
  } catch (err) {
    console.warn('⚠️ Could not persist to disk, stored in RAM:', err.message);
  }

  return memorySiteData;
};

module.exports = {
  connectDB,
  getSiteData,
  updateSiteData,
  isMongoConnected: () => mongoose.connection.readyState === 1
};

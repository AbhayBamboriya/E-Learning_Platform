import express from 'express';
const router = express.Router();
import db, { Doubt } from '../Model/user.js';
import { isLoggedIn } from '../middleware/authMiddleware.js';
import upload from '../middleware/multeer.middleware.js';
import cloudinary from 'cloudinary';
import User from '../Model/user.js';
import AppError from '../utils/error.js';

// Get All Doubts (Students can post, Teachers can answer)
router.get('/', async (req, res, next) => {
  try {
    const doubts = await Doubt.GetAllDoubts();
    console.log('d', doubts);

    res.status(200).json({
      success: true,
      data: doubts,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
});

// Post a Doubt (Only students)
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const Name = req.user.Name;

    console.log('let', Name, title, description, req.user);

    if (!title || !description) {
      return next(new AppError('Title and Description are required', 400));
    }
    if (req.user.role !== 'student') {
      return res.status(403).json({ success: false, message: 'Only students can post doubts.' });
    }

    await Doubt.PostDoubt(Name, title, description, userId);
    res.status(201).json({ success: true, message: 'Doubt posted successfully' });
  } catch (e) {
    next(new AppError(e.message, 500));
  }
});

// Upload Resources (pdf etc.)
router.post('/upload', isLoggedIn, upload.single('pdf'), async (req, res, next) => {
  try {
    let publicURL = 'dk';
    let secureUrl = 'cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'raw' });
      if (result) {
        publicURL = result.public_id;
        secureUrl = result.secure_url;
      }
    }

    console.log('fkddkffdfdfdfdfdfdfd00', req.body);
    console.log('user', req.user);

    const { subject, description, year, branch } = req.body;
    if (!subject || !description || !year || !branch) {
      return next(new AppError('All the fields are mandatory.', 400));
    }

    await Doubt.UploadResources(req.user.id, secureUrl, subject, description, year, branch);
    res.status(201).json({ success: true, message: 'Resources uploaded successfully', url: secureUrl });
  } catch (e) {
    next(new AppError(e.message || 'File not uploaded, please try again', 500));
  }
});

// Upload Book (Only teachers)
router.post('/uploadBook', isLoggedIn, upload.single('bookFile'), async (req, res, next) => {
  try {
    const { subjectName, bookName, year } = req.body;
    console.log('user is', req.user);

    if (!subjectName || !bookName || !year || !req.file) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (req.user.role !== 'teacher') {
      return next(new AppError('Not allowed to upload the books.', 403));
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'books',
    });

    const uploadData = {
      subjectName,
      year,
      uploaderName: req.user.Name,
      bookName,
      secureUrl: result.secure_url,
      cloudinaryId: result.public_id,
    };
    await Doubt.UploadBook(uploadData);

    res.status(201).json({ success: true, message: 'File uploaded successfully!', data: uploadData });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'File upload failed.', error: error.message });
  }
});

// Get all Books (Logged in users)
router.get('/allBooks', isLoggedIn, async (req, res, next) => {
  try {
    const books = await Doubt.GetAllBooks();
    if (!books || books.length === 0) {
      return next(new AppError('No books found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

// Get all Notes (Logged in users)
router.get('/allNotes', isLoggedIn, async (req, res, next) => {
  try {
    const notes = await Doubt.GetAllNotes();
    if (!notes || notes.length === 0) {
      return next(new AppError('No notes found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Notes retrieved successfully',
      data: notes,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

// Get all PYQ (Logged in users)
router.get('/allPYQ', isLoggedIn, async (req, res, next) => {
  try {
    const pyq = await Doubt.GetAllPaper();
    if (!pyq || pyq.length === 0) {
      return next(new AppError('No papers found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Papers retrieved successfully',
      data: pyq,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

// Get all PDFs/Resources
router.get('/Getpdf', isLoggedIn, async (req, res, next) => {
  try {
    console.log('inside Getpdf');
    const result = await Doubt.GetResources();
    console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (e) {
    next(new AppError(e.message, 500));
  }
});

// Answer a Doubt (Only teachers)
router.post('/:id/answer', isLoggedIn, async (req, res, next) => {
  try {
    const doubtId = req.params.id;
    const { answer } = req.body;
    const userId = req.user.id;

    console.log('user', req.user);

    // Optionally check role
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ success: false, message: 'Only teachers can answer doubts.' });
    }

    const result = await Doubt.SolveDoubt(doubtId, answer, userId);
    res.status(201).json({ success: true, message: 'Answer posted successfully', result });
  } catch (e) {
    next(new AppError(e.message, 500));
  }
});

// Get all answers for a particular doubt
router.get('/answer/:id', async (req, res, next) => {
  try {
    const doubtId = req.params.id;
    const result = await Doubt.GetAnswers(doubtId);

    res.status(200).json({
      success: true,
      message: 'All answers',
      data: result,
    });
  } catch (e) {
    next(new AppError(e.message, 500));
  }
});

// Upload Question Paper (Only teachers)
router.post('/uploadPaper', isLoggedIn, upload.single('questionPaper'), async (req, res, next) => {
  try {
    const { subjectName, year, branch, paperYear } = req.body;

    if (!subjectName || !year || !paperYear || !branch || !req.file) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (req.user.role !== 'teacher') {
      return next(new AppError('Not allowed to upload question papers.', 403));
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'question-papers',
    });

    const uploadData = {
      subjectName,
      year,
      paperYear,
      branch,
      cloudinaryUrl: result.secure_url,
      cloudinaryId: result.public_id,
    };

    await Doubt.UploadPaper(uploadData);

    res.status(201).json({ success: true, message: 'Question paper uploaded successfully!', data: uploadData });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'File upload failed.', error: error.message });
  }
});

export default router;

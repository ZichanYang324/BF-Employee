const express = require('express');
const router = express.Router();
const authenticate = require('./authMiddleware');
const checkHRRole = require('./hrRoleMiddleware');
const DocumentController = require('../controllers/DocumentController');

// upload a document
router.post('/upload', authenticate, DocumentController.uploadDocument);

// update document status (for HR)
router.patch('/:documentId/status', authenticate, checkHRRole, DocumentController.updateDocumentStatus);

// get user's documents
router.get('/my', authenticate, DocumentController.getMyDocuments);

module.exports = router;
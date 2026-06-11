const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');
const UserContact = require('../model/UserContactModel');

const extractPublicId = (fileUrl) => {
    const url = new URL(fileUrl);
    const parts = url.pathname.split('/');
    const uploadIndex = parts.indexOf('upload');
    const relevantParts = parts.slice(uploadIndex + 2);
    const last = relevantParts[relevantParts.length - 1];
    relevantParts[relevantParts.length - 1] = last.split('.')[0];
    return relevantParts.join('/');
};

const isCloudinaryUrl = (url) => {
    try {
        const parsed = new URL(url);
        return parsed.hostname.includes('cloudinary.com');
    } catch {
        return false;
    }
};

const pdfStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'portfolio/resumes/pdf',
        allowed_formats: ['pdf'],
        resource_type: 'raw',
    },
});

const docxStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'portfolio/resumes/docx',
        allowed_formats: ['docx'],
        resource_type: 'raw',
    },
});

const uploadPdfMiddleware = multer({
    storage: pdfStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
}).single('resume');

const uploadDocxMiddleware = multer({
    storage: docxStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.originalname.endsWith('.docx')
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only DOCX files are allowed'), false);
        }
    },
}).single('resume');

const uploadPdfResume = async (req, res) => {
    uploadPdfMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No PDF file provided' });
        }

        try {
            const userContact = await UserContact.findOne();

            if (!userContact) {
                await cloudinary.uploader.destroy(extractPublicId(req.file.secure_url || req.file.path), { resource_type: 'raw' });
                return res.status(404).json({ success: false, message: 'User contact record not found' });
            }

            const oldPdfLink = userContact.resume_link?.pdf_link;
            if (oldPdfLink && isCloudinaryUrl(oldPdfLink)) {
                try {
                    const oldPublicId = extractPublicId(oldPdfLink);
                    await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'raw' });
                } catch {
                }
            }

            const newPdfUrl = req.file.secure_url || req.file.path;
            userContact.resume_link.pdf_link = newPdfUrl;
            await userContact.save();

            return res.status(200).json({
                success: true,
                message: 'PDF resume uploaded successfully',
                pdf_link: newPdfUrl,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to upload PDF resume', error: error.message });
        }
    });
};

const uploadDocxResume = async (req, res) => {
    uploadDocxMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No DOCX file provided' });
        }

        try {
            const userContact = await UserContact.findOne();

            if (!userContact) {
                await cloudinary.uploader.destroy(extractPublicId(req.file.secure_url || req.file.path), { resource_type: 'raw' });
                return res.status(404).json({ success: false, message: 'User contact record not found' });
            }

            const oldWordLink = userContact.resume_link?.word_link;
            if (oldWordLink && isCloudinaryUrl(oldWordLink)) {
                try {
                    const oldPublicId = extractPublicId(oldWordLink);
                    await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'raw' });
                } catch {
                }
            }

            const newDocxUrl = req.file.secure_url || req.file.path;
            userContact.resume_link.word_link = newDocxUrl;
            await userContact.save();

            return res.status(200).json({
                success: true,
                message: 'DOCX resume uploaded successfully',
                word_link: newDocxUrl,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to upload DOCX resume', error: error.message });
        }
    });
};

const getResumeLinks = async (req, res) => {
    try {
        const userContact = await UserContact.findOne().select('resume_link');

        if (!userContact) {
            return res.status(404).json({ success: false, message: 'User contact record not found' });
        }

        return res.status(200).json({
            success: true,
            resume_links: {
                pdf_link: userContact.resume_link?.pdf_link || null,
                word_link: userContact.resume_link?.word_link || null,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch resume links', error: error.message });
    }
};

module.exports = { uploadPdfResume, uploadDocxResume, getResumeLinks };
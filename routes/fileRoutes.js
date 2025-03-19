const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/File');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { file } = req;
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  const newFile = new File({
    filename: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: fileUrl,
  });
  await newFile.save();
  res.json({ message: 'File uploaded', url: fileUrl, fileId: newFile._id });
});

router.get('/', async (req, res) => {
  const files = await File.find();
  res.json(files);
});

router.get('/:id', async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ message: 'File not found' });
  res.json(file);
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const oldFile = await File.findById(req.params.id);
  if (!oldFile) return res.status(404).json({ message: 'File not found' });

  fs.unlinkSync(path.join(__dirname, '..', 'public/uploads', oldFile.filename));

  const { file } = req;
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  oldFile.filename = file.filename;
  oldFile.originalname = file.originalname;
  oldFile.mimetype = file.mimetype;
  oldFile.size = file.size;
  oldFile.url = fileUrl;
  await oldFile.save();

  res.json({ message: 'File updated', url: fileUrl });
});

router.delete('/:id', async (req, res) => {
  const file = await File.findByIdAndDelete(req.params.id);
  if (!file) return res.status(404).json({ message: 'File not found' });

  fs.unlinkSync(path.join(__dirname, '..', 'public/uploads', file.filename));
  res.json({ message: 'File deleted' });
});

module.exports = router;

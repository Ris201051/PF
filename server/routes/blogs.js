const express = require('express');
const router = express.Router();
let blogs = [];

// GET all blogs
router.get('/', (req, res) => {
  res.json(blogs);
});

// POST new blog
router.post('/', (req, res) => {
  const newBlog = { id: Date.now().toString(), ...req.body };
  blogs.push(newBlog);
  res.json(newBlog);
});

// PUT update blog
router.put('/:id', (req, res) => {
  blogs = blogs.map(blog => blog.id === req.params.id ? { ...blog, ...req.body } : blog);
  res.json({ success: true });
});

// DELETE blog
router.delete('/:id', (req, res) => {
  blogs = blogs.filter(blog => blog.id !== req.params.id);
  res.json({ success: true });
});

module.exports = router;

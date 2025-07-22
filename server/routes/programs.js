const express = require('express');
const router = express.Router();
let programs = [];

// CRUD similar to blogs
router.get('/', (req, res) => {
  res.json(programs);
});
router.post('/', (req, res) => {
  const newProgram = { id: Date.now().toString(), ...req.body };
  programs.push(newProgram);
  res.json(newProgram);
});
router.put('/:id', (req, res) => {
  programs = programs.map(p => p.id === req.params.id ? { ...p, ...req.body } : p);
  res.json({ success: true });
});
router.delete('/:id', (req, res) => {
  programs = programs.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

module.exports = router;

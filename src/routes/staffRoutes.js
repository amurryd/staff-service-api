const express = require('express');
const Staff = require('../models/Staff');

const router = express.Router();

// Create a new staff member
router.post('/staff', async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all staff members
router.get('/staff', async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single staff member by ID
router.get('/staff/:id', async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(404).json({ error: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a staff member
router.put('/staff/:id', async (req, res) => {
  try {
    const [updated] = await Staff.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedStaff = await Staff.findByPk(req.params.id);
      res.status(200).json(updatedStaff);
    } else {
      res.status(404).json({ error: 'Staff not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a staff member
router.delete('/staff/:id', async (req, res) => {
  try {
    const deleted = await Staff.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

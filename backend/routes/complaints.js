// backend/routes/complaints.js
// Complaint management routes

const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// @route   POST /api/complaints
// @desc    Create a new complaint (Student only)
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { category, description } = req.body;

    // Validate input
    if (!category || !description) {
      return res.status(400).json({ message: 'Please provide category and description' });
    }

    // Get user details
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create complaint
    const complaint = new Complaint({
      studentId: user._id,
      studentName: user.name,
      studentEmail: user.email,
      category,
      description
    });

    await complaint.save();

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating complaint' });
  }
});

// @route   GET /api/complaints/my
// @desc    Get all complaints by logged-in student
// @access  Private (Student)
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ studentId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching complaints' });
  }
});

// @route   GET /api/complaints
// @desc    Get all complaints (Admin only)
// @access  Private (Admin)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, category } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 });

    res.json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching complaints' });
  }
});

// @route   PUT /api/complaints/:id
// @desc    Update complaint status/assignment (Admin only)
// @access  Private (Admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, assignedTo, remarks } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update fields if provided
    if (status) complaint.status = status;
    if (assignedTo) complaint.assignedTo = assignedTo;
    if (remarks) complaint.remarks = remarks;

    await complaint.save();

    res.json({
      message: 'Complaint updated successfully',
      complaint
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating complaint' });
  }
});

// @route   DELETE /api/complaints/:id
// @desc    Delete a complaint (Admin only)
// @access  Private (Admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await complaint.deleteOne();

    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting complaint' });
  }
});

module.exports = router;
const User = require('../models/User');
const { DateTime } = require('luxon');

exports.getUsers = async (req, res) => {
  try {
    const { sortBy, date } = req.query;
    console.log("sortBy:", req.query.sortBy); 
    const sortOrder = sortBy === 'latest' ? -1 : 1;
    // const sortOrder = -1
    const dateFilter = date ? DateTime.fromFormat(date, 'dd/MM/yyyy').toMillis() : null;

    const query = dateFilter ? { time_of_registration: { $gte: dateFilter } } : {};
    const users = await User.find(query).sort({ time_of_registration: sortOrder });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error); 
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};



exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const loggedInUserId = req.user.id;
    const updatedData = req.body;

    if (userId !== loggedInUserId) {
      return res.status(403).json({ error: 'You are not authorized to update this user' });
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
};
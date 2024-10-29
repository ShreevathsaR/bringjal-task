const User = require('../models/User');
const { DateTime } = require('luxon');

exports.getUsers = async (req, res) => {
  try {
    const { sortBy, date } = req.query;
    const sortOrder = sortBy === 'latest' ? -1 : 1;
    const dateFilter = date ? DateTime.fromFormat(date, 'dd/MM/yyyy').toMillis() : null;

    const query = dateFilter ? { time_of_registration: { $gte: dateFilter } } : {};
    const users = await User.find(query).sort({ time_of_registration: sortOrder });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

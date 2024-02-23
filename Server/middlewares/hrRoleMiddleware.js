const checkHRRole = (req, res, next) => {
    if (req.user.role !== 'HR') {
      return res.status(403).json({ message: "Access denied. HR role required." });
    }
    next();
  };
  
  module.exports = checkHRRole;
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
    }
    next();
  };
};

module.exports = authorizeRoles;

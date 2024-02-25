import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const expiresIn = '3h'
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 3 * 60 * 60 * 1000, // 3 hours
  });

  return {token,expiresIn}
};

export default generateToken;

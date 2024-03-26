import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/model.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});




// User must be a student middleware
const student = (req, res, next) => {
  if (req.user && req.user.role=="student") {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an student');
  }
};



// User must be a teacher middleware
const teacher = (req, res, next) => {
  if (req.user && req.user.role=="teacher") {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an teacher');
  }
};

// User must be a supervisor middleware
const supervisor = (req, res, next) => {
  if (req.user && req.user.role=="supervisor") {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an supervisor');
  }
};

// User must be a director middleware
const director = (req, res, next) => {
  if (req.user && req.user.role=="director") {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an director');
  }
};

// User must be a secretary middleware
const secretary = (req, res, next) => {
  if (req.user && req.user.role=="secretary") {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an secretary');
  }
};


// User must be an admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role=="admin") {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect,
  student,
  teacher,
  supervisor,
  director,
  secretary,
  admin,
};

import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/model.js';
import e from 'express';



// @desc    Auth user & get token (login)
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // const { cin,email, password } = req.body;// by cin
  // const user = await User.findOne({ cin });
  const { email, password } = req.body;
  const user = await User.findOne({ email });
// Check if a user exists  and psw is correct
  if (user && (await user.matchPassword(password))) {
    // Check if a user exists
    generateToken(res, user._id);
    // Send a response with status code 200 in json format
    // student
    if (user.role === 'student'){
      res.status(200).json({
        _id: user._id,
        cin: user.cin,
        name: user.name,
        email: user.email,
        role: user.role,
        class: user.class,
        subjects:user.subjects
      });
    } 
    //teacher
    else if (user.role === 'teacher'){
    res.status(200).json({
      _id: user._id,
      cin: user.cin,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      teachingSubjects: user.teachingSubjects,
    });
    }
    else{
      res.status(200).json({
        _id: user._id,
        cin: user.cin,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }

  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});






// @desc    create a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { cin,name, email, password, role } = req.body;
  let additionalFields = {};

  if (role === "student") {
    additionalFields = {
      class: req.body.class,
      subject: req.body.subject // Assuming subject is also needed for students
    };
  } else if (role === "teacher") {
    additionalFields = {
      department: req.body.department,
      teachingSubjects: req.body.teachingSubjects
    };
  }
  // Merge the additional fields with the common fields
  const userData = {
    cin,
    name,
    email,
    password,
    ...additionalFields
  };

  // check if email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // save new user
  const user = await User.create(userData);

  if (user) {
    // generate a JWT token
    generateToken(res, user._id);
    // Send a response with state 201 in json format
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});




// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  // change 'jwt' to  empty value
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};





// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});





// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});




// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.role ="admin") {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



//§ get user by id and cin
//=> id
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//=> cin
// @desc    Get user by cin
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByCin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.cin).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});




// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


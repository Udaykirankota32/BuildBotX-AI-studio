import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.utils.js';

export const register = async (name, email, password) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error('Email already registered.');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = generateToken(user);
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const emailLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user);
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

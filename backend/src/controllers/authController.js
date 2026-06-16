import User from '../models/User.js';

import {
  generateToken
} from '../utils/generateToken.js';

/* =========================
   REGISTER
========================= */

export const register = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   LOGIN
========================= */

export const login = async (
  req,
  res
) => {

  try {

    const { email, password } =
      req.body;

    const user = await User
      .findOne({ email })
      .select('+password');

    if (!user) {

      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const isMatch =
      await user.matchPassword(password);

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
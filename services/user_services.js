const { User, Role } = require("../models/user_model");
const Session = require("../models/session_model");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sai1999naguboina@gmail.com", // Replace with your Gmail email
    pass: "gmvi jcnv zigx lrxc", // Replace with your Gmail password
  },
});

const userLogin = async (req, res) => { 
  const { username, password } = req.body;

  try {
    console.log("Attempting login for username:", username);

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is active
    if (!user.is_active) {
      console.log("User is not active. Login is not allowed.");
      return res
        .status(401)
        .json({ message: "User is not active. Login is not allowed." });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid username or password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check for existing session for the user
    let session = await Session.findOne({ userId: user._id });

    // If an existing session is found, update its token and expiration time
    if (session) {
      console.log("Existing session found. Updating...");
      session.token = jwt.sign(
        { userId: user._id, username: user.username, roleId: user.roleId },
        "jwtSecret",
        { expiresIn: "1h" }
      );
      session.expiresAt = new Date(Date.now() + 3600000); // Extend expiration time
      await session.save();
      console.log("Existing session updated.");
    } else {
      // Generate a new token and create a new session
      const token = jwt.sign(
        { userId: user._id, username: user.username, roleId: user.roleId },
        "jwtSecret",
        { expiresIn: "1h" }
      );
      session = await Session.create({
        userId: user._id,
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
      });
      console.log("New session created.");
    }

    console.log("Login successful for username:", username);

    // Return userId, token, role name, and forcePasswordChange
    res.status(200).json({
      userId: user._id,
      token: session.token,
      roleID: user.roleId,
      forcePasswordChange: user.forcePasswordChange,
      username: user.email,
      userProfileImage: user.userProfileImage,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const bcrypt = require("bcryptjs"); // Make sure to install the 'bcryptjs' package

//Endpoint to reset for first time/change password/forgot password
const userChangePassword = async (req, res) => {
  const { userId, newPassword, resetToken } = req.body;
  console.log(userId, newPassword, resetToken);

  try {
    // Find user by userId
    let query;

    if (userId) {
      console.log("userid");
      query = { _id: userId };
    } else if (resetToken) {
      console.log("resetToken");
      query = { resetToken: resetToken };
    } else {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const user = await User.findOne(query);
    console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if newPassword and confirmPassword are equal
    /* if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    } */

    if (resetToken) {
      const presentTime = new Date();
      if (user.resetTokenExpiration >= presentTime) {
        console.log("enterd by token");
        console.log(newPassword.length);
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        console.log(hashedPassword);

        // Update user with the new password
        /*  user.password = hashedPassword ; */
        const Users = await User.findOneAndUpdate(
          { resetToken: resetToken },
          { password: hashedPassword, forcePasswordChange: false }
        );
        // If 'forcePasswordChange' flag is present, you can update it here
        console.log(user);
        //user.forcePasswordChange = false;

        await Users.save();
        res.status(200).json({ message: "Password changed successfully" });
      } else {
        res.status(400).json({ message: "token expired" });
      }
    } else if (userId) {
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      console.log(hashedPassword);

      const Users = await User.findOneAndUpdate(
        { _id: userId },
        { password: hashedPassword, forcePasswordChange: false }
      );
      // If 'forcePasswordChange' flag is present, you can update it here
      //user.forcePasswordChange = false;

      await Users.save();
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(500).json({ message: "data is not availabel" });
    }
    // Hash the new password before saving it to the database
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint to request a password reset email
const userForgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token and expiration
    const resetToken = randomstring.generate(20);
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour

    // Update user with reset token and expiration
    /* user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();
 */
    // Send reset email (you may customize the email content)
    const updateduser = await User.findOneAndUpdate(
      { email: email },
      { resetToken: resetToken, resetTokenExpiration: resetTokenExpiration }
    );
    await updateduser.save();
    const transporter = nodemailer.createTransport({
      // Your email configuration
      service: "gmail",
      auth: {
        user: "sai1999naguboina@gmail.com",
        pass: "gmvi jcnv zigx lrxc",
      },
    });

    // await transporter.sendMail({
    //   from: "sai1999naguboina@gmail.com",
    //   to: email,
    //   subject: "Password Reset",
    //   // text: `Click the following link to reset your password: http://localhost:3050/reset-password/${resetToken}`,
    // });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint to get user details by ID
const getUserDetails = async (req, res) => {  ``
  const userId = req.query.userId;
  console.log(userId);

  try {
    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user details
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Endpoint to update user details
const updateUserDetails = async (req, res) => {
  try {
    const updateData = req.body;
    console.log("req.body:", updateData);

    //console.log(updatedUserData);
    // Find user by ID
    const user = await User.findById(updateData._id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUserData = {
      ...updateData,
      userProfileImage: req.file ? req.file.filename : user.userProfileImage,
    };
    if (updatedUserData) {
      // Update user details
      Object.assign(user, updatedUserData);
      await user.save();
      console.log(updatedUserData);
      // Return updated user details
      res.status(200).json({ user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Endpoint to delete user details
const deleteUserDetails = async (req, res) => {
  const userId = req.query.id;

  try {
    // Find user by ID and remove
    const user = await User.findByIdAndDelete(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return deleted user details
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Endpoint to user logout
const userLogout = async (req, res) => {
  const userToken = req.headers.authorization; // Assuming you're sending the token in the Authorization header

  // Check if the user is authenticated
  if (!userToken || !sessions[userToken]) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    // Logout the user by removing their session
    delete sessions[userToken];
    res.status(200).json({ message: "Logged out successfully" });
  }
};

const createUser = async (req, res) => {
    const {
      name,
      mobileNo,
      email,
      roleId,
    } = req.body;
   
    console.log( name,mobileNo, email, roleId,)
  
    
    const username = email;
    const password = /* randomstring.generate(8) */generateRandomPassword();
     console.log(password);
    try {
      // Check if roleId is provided and valid (you might want more thorough validation)
      /* if (!roleId || typeof roleId !== 'number') {
        return res.status(400).json({ message: 'Invalid roleId provided.' });
      } */
  
      const user = new User({
        name,
        mobileNo,
        email,
        username,
        password,
        roleId,
       // userProfileImage: req.file?.filename ?? '', // If req.file or req.file.filename is undefined, set to an empty string
      });
      
      await user.save();
     console.log(user);
      await transporter.sendMail({
        from: 'sai1999naguboina@gmail.com',
        to: email,
        subject: 'Your account details',
        text: `Username: ${username}\nPassword: ${password}`,
      });
  
      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
  userLogin,
  userChangePassword,
  userForgotPassword,
  getUserDetails,
  updateUserDetails,
  deleteUserDetails,
  userLogout,
};

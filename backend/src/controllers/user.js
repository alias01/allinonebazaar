const { isEqual } = require("lodash");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { success, error, validation } = require("../utilities/apiResponse");
const jwt = require("jsonwebtoken");

const userController = {
  loginUser: async (req, res) => {
    let { username, password } = req.body;

    let user = await userModel.getUser(username);

    if (user.rowCount === 0) {
      return res.status(400).send(error("user does not exist."));
    }

    // password checking
    const isValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isValid) {
      return res.status(400).send(error("username or password wrong"));
    }

    const token = jwt.sign(
      { _id: user.rows[0].user_id },
      process.env.SECRET_KEY
    );
    return res.header("auth-token", token).send({
      token,
      user: { username: user.rows[0].username },
    });
  },

  registerUser: async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    try {
      let userExists = await userModel.getUser(username);

      if (userExists.rows.length > 0) {
        // return message already registered
        return res
          .status(200)
          .send(
            error("User already exists. Please try with a different username.")
          );
      }

      if (!isEqual(password, repeatPassword)) {
        // password mismatch
        return res.status(400).send(error("Password mismatch."));
      }

      const saltRounds = 10;
      let hashPassword = bcrypt.hashSync(password, saltRounds);

      let registeredUser = await userModel.registerUser(username, hashPassword);

      if (registeredUser.rowCount > 0) {
        return res
          .status(200)
          .send(
            success("User registered sucessfully.", registeredUser.rows[0], 200)
          );
      }
    } catch {
      return res.status(500).send(error("Error registering user."));
    }
  },

  userAvailability: async (req, res) => {
    console.log("helllo");
    let { username } = req.body;
    let userExists = await userModel.getUser(username);

    if (userExists.rows.length > 0) {
      // return message already registered
      return res
        .status(200)
        .send(
          error("User already exists. Please try with a different username.")
        );
    } else {
      return res.status(200).send(success("Username is available"));
    }
  },
};

module.exports = userController;

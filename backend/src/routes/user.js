const express = require("express");
const router = express.Router();
const schemaValidator = require("../middlewares/schemaValidator");
const {
  signupSchema,
  loginSchema,
  usernameSchema,
} = require("../models/user.schema");
const { userController } = require("../controllers");

router.post(
  "/login",
  schemaValidator("body", loginSchema),
  userController.loginUser
);

router.post(
  "/signup",
  schemaValidator("body", signupSchema),
  userController.registerUser
);

router.post(
  "/username-availability",
  schemaValidator("body", usernameSchema),
  userController.userAvailability
);

module.exports = router;

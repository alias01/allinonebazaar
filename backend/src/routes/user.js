const express = require("express");
const router = express.Router();
const schemaValidator = require("../middlewares/schemaValidator");
const { signupSchema, loginSchema } = require("../models/user.schema");
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

module.exports = router;

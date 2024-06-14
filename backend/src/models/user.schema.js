const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string(),
});

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  repeatPassword: Joi.ref("password"),
});

const usernameSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = { signupSchema, loginSchema, usernameSchema };

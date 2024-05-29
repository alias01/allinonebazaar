const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().when(Joi.ref("$email"), {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),
  email: Joi.string().email().when(Joi.ref("$username"), {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.required(),
  }),
  password: Joi.string(),
});

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  repeatPassword: Joi.ref("password"),
});

module.exports = { signupSchema, loginSchema };

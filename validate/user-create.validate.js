const Joi = require('@hapi/joi');

const userValidate =  (user) => {
  const userSchema =  Joi.object({
    firstName: Joi.string()
    .required()
    .min(5)
    .max(15),
    surName:Joi.string()
    .required()
    .min(5)
    .max(15),
    email: Joi.string()
    .email()
    .required(),
    userImage: Joi.string(),
    password: Joi.string()
    .required()
    .min(6),
    groupNumber:Joi.string()
    .min(1)
    .max(5),
    category: Joi.string()
    .required()
  })
  return Joi.validate(user, userSchema)
}

module.exports = userValidate
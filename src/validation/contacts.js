import Joi from 'joi';

// export const createContactSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required(),
//   phoneNumber: Joi.string().min(3).max(20).required(),
//   email: Joi.string().email(),
//   isFavourite: Joi.boolean(),
//   contactType: Joi.string().valid('work', 'home', 'personal').required(),
//   photo: Joi.string(),
// });

// export const updateContactSchema = Joi.object({
//   name: Joi.string().min(3).max(20),
//   phoneNumber: Joi.string().min(3).max(20),
//   email: Joi.string().email(),
//   isFavourite: Joi.boolean(),
//   contactType: Joi.string().valid('work', 'home', 'personal'),
//   photo: Joi.string(),
// });
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  photo: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    destination: Joi.string(),
    filename: Joi.string(),
    path: Joi.string(),
    size: Joi.number(),
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  photo: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    destination: Joi.string(),
    filename: Joi.string(),
    path: Joi.string(),
    size: Joi.number(),
  }),
});

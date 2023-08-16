import { body, query, param, oneOf } from "express-validator";

export const signupValidation = [
  body("name")
    .exists()
    .withMessage("Name field is required.")
    .isString()
    .withMessage("Name field must be a string.")
    .isLength({ max: 15, min: 2 })
    .withMessage("Name must be between 2 and 15 characters long."),
  body("email")
    .exists()
    .withMessage("Email field is required.")
    .isEmail()
    .withMessage("Invalid email address."),
  body("password")
    .exists()
    .withMessage("Password field is required.")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."
    ),
];

export const loginValidation = [
  body("userName")
    .exists()
    .withMessage("User Name field is required.")
    .isString()
    .withMessage("Invalid user name"),
  body("password")
    .exists()
    .withMessage("Password field is required.")
    .isLength({ max: 15, min: 2 })
    .withMessage("Password must be between 2 and 15 characters long."),
];

export const createPostValidator = [
  body("user").optional().isMongoId().withMessage("Invalid user ID"),
  body("audioUri").custom((value, { req }) => {
    if (
      ((req.body.audioUri || req.body.audioTitle) &&
        !(req.body.videoUri || req.body.photoUri)) ||
      ((req.body.videoUri || req.body.videoTitle) &&
        !(req.body.audioUri || req.body.photoUri)) ||
      (req.body.photoUri && !(req.body.audioUri || req.body.videoUri)) ||
      req.body.postText
    ) {
      return true;
    }
    throw new Error(
      "Either audio (URI and title) or video URI or photo URIs must be provided"
    );
  }),
  body("photoUri")
    .optional()
    .isArray()
    .withMessage("Photo Uri must be an array of URI"),
  body("audioTitle")
    .if(body("audioUri").exists())
    .notEmpty()
    .withMessage("Audio title is required if audio URI is provided"),
  body("videoTitle")
    .if(body("videoUri").exists())
    .isString()
    .notEmpty()
    .withMessage("Video title is required if video URI is provided"),

  body("postText")
    .optional()
    .isString()
    .withMessage("Post text must be a string"),

];

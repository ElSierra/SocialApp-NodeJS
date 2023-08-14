import { body, query, param } from "express-validator";

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

export const otpValidation = [
  query("email")
    .exists()
    .withMessage("Email parameter is required.")
    .isEmail()
    .withMessage("Invalid email address."),
  body("otp")
    .exists()
    .withMessage("OTP field is required.")
    .isNumeric()
    .withMessage("OTP must be a 4-digit number.")
    .isLength({ min: 4, max: 4 })
    .withMessage("OTP must be a 4-digit number."),
];

export const resetPasswordValidation = [
  body("email")
    .exists()
    .withMessage("Email parameter is required.")
    .isEmail()
    .withMessage("Email parameter is required."),
];

export const emailJWTValidation = [
  param("token").exists().isJWT().withMessage("Invalid JWT"),
];

export const passwordChangeValidation = [
  body("oldPassword").exists().isString().withMessage("Invalid"),
  body("password")
    .exists()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."
    ),
];

export const locationUpdateValidation = [
  body("location").exists().isLatLong().withMessage("Invalid location format."),

  body("address").exists().withMessage("Invalid address format."),
];

export const orderFoodValidation = [
  body("menuList").exists().isArray().withMessage("Not Valid MenuId Array"),
  body("restaurantId").exists().isMongoId().withMessage("Not Valid MenuId"),
];

export const makePaymentValidation = [
  body("orderId").exists().isMongoId().withMessage("Not Valid MenuId"),
];
export const retryOTPValidation = [
  query("email").exists().isEmail().withMessage("Not Valid Email"),
];

export const restaurantGetValidation = [
  query("skip").optional().isNumeric().withMessage("Not valid Number"),
  query("name").optional().isString().withMessage("Not valid string"),
  query("take").optional().isNumeric().withMessage("Not valid number"),
];

export const CreateRestaurantValidation = [
  body("location").exists().isLatLong().withMessage("Invalid location format."),
  body("category").exists().withMessage("empty"),
  body("address").exists().withMessage("Invalid address format."),
  body("name").exists().isString().withMessage("Invalid"),
];
export const rateRestaurantsValidation = [
  query("restaurant").exists().isMongoId().withMessage("Invalid"),
  query("like").exists().isBoolean().withMessage("Not Boolean"),
];
export const getSingleRestaurantValidation = [
  param("id").exists().isMongoId().withMessage("invalid"),
];

export const createMenuValidation = [
  query("restaurant").exists().isMongoId().withMessage("Invalid"),
  body("name").exists().isString().withMessage("Invalid"),
  body("price").exists().isFloat().withMessage("Invalid"),
];

export const updateInfoValidation = [
  body("name").isString().optional(),
  body("phone")
    .exists()
    .withMessage("Phone field is required.")
    .isMobilePhone(["en-NG", "en-GH"])
    .withMessage("Invalid phone number format."),
];

export const uploadPhotoPreviewValidation = [
  body("photoPreview").isDataURI().exists(),
];

import { Router } from "express";
import { createUser } from "../../controller/auth/createUser";
import { loginUser } from "../../controller/auth/loginUser";
import { handleErrors } from "../../middleware/validation/handleErrors";
import {
  loginValidation,
  signupValidation,
} from "../../middleware/validation/inputValidation";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    msg: "server is up",
  });
});


export default router;

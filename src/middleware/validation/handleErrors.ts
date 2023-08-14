import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const errorFormatter = ({
  location,
  msg,
  param,
  value,
  nestedErrors,
}: {
  location?: any;
  msg?: any;
  param?: any;
  value?: any;
  nestedErrors?: any;
}) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${location}[${param}]: ${msg}`;
};

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
    res.status(400).json(errors);
  } else {
    next();
  }
};

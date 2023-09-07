import { Request } from "express";

export interface CustomRequest extends Request {
    user: {
      id: string; // Replace string with the actual type of userId
    };
  }
  
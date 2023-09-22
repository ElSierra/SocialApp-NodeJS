import { rateLimit } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false, 
});

export const authRateLimiter = rateLimit({
  windowMs: 3 * 60 * 60 * 1000, 
  max: 5, 
  standardHeaders: true,
  legacyHeaders: false,
  
});


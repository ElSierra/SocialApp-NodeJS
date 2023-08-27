import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { blockJWT, protect } from "./middleware/auth";
import globalRouter from "./routes/global";
import authRouter from "./routes/auth";
import services from "./routes/services";
import { ErrorHandler } from "./controller/error/ErrorHandler";
import user from "./routes/user";
import http from "http";
import helmet from "helmet";
import { apiLimiter, authRateLimiter } from "./middleware/validation/rateLimiter";

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);
app.use("/api", globalRouter);

app.use("/api/auth",authRateLimiter, authRouter);

app.use("/api/services", blockJWT, protect, services);
app.use("/api/user", blockJWT, protect, user);
app.use(ErrorHandler);
export default server;

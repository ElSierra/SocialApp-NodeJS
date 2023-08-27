import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else {
  envConfig = require("./local").default;
}

export default merge({
  stage,
  env: process.env.NODE_ENV,
  port: 80,
  secrets: {
    db: process.env.DATABASE_URL,
    jwt: process.env.SECRET,
  },
},envConfig);

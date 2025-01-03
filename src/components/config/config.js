import "dotenv/config";

const dev = process.env.NODE_ENV != "production";
export const URL = dev ? process.env.DEV_URL : process.env.PROD_URL;
export const PASSWORD = process.env.PASSWORD


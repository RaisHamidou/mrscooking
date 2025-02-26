import "dotenv/config";

const dev = process.env.NODE_ENV != "production";
export const URL = dev ? "http://localhost:4000" : "https://www.mrscooking.com";



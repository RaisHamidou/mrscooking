const dev = process.env.NODE_ENV != "production"
const URL = dev ? "http://localhost:4000":"https://www.mrscooking.com"

export default URL
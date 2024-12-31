const dev = process.env.NODE_ENV != "production"
const URL = dev ? "http://localhost:4000":"https://mrscooking-git-main-raishamidou1s-projects.vercel.app"

export default URL
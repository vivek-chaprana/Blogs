export const SALT_ROUNDS = 10;

export const WEBAPP_URL = "http://localhost:3000"

export const SECRET = process.env.NEXTAUTH_SECRET;

export const IS_SERVER = typeof window === "undefined";

export const currentTime = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })


export const COMPANY_NAME = "BLOGS";


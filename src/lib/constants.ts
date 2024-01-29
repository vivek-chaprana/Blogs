export const SALT_ROUNDS = 10;

export const WEBAPP_URL = "http://localhost:3000"

export const SECRET = process.env.NEXTAUTH_SECRET;

export const IS_SERVER = typeof window === "undefined";

export const currentTime = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })

export const COMPANY_NAME = "BLOGS";

export const fallbackImageUrl = "https://i.pinimg.com/564x/a9/99/ee/a999ee87f1cc57beb5cc1c60fc96cded.jpg"

export const providers = {
    GOOGLE: "google",
    GITHUB: "github",
    EMAIL: "email",
}


// Cloudinary
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME ?? "dmudoqnix";
export const UPLOAD_PRESET = process.env.UPLOAD_PRESET ?? "blogs-app-vicky";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;  
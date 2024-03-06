export const SALT_ROUNDS = 10;

export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  "http://localhost:3000";

export const SECRET = process.env.NEXTAUTH_SECRET;

export const IS_SERVER = typeof window === "undefined";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "vivek2003ji@outlook.com";

export const currentTime = () =>
  new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });

export const COMPANY_NAME = "NextBlogs";
export const COMPANY_INITIALS = "NB";

export const fallbackImageUrl =
  "https://i.pinimg.com/564x/a9/99/ee/a999ee87f1cc57beb5cc1c60fc96cded.jpg";

export const fallbackCoverImageUrl =
  "https://images.unsplash.com/photo-1624396963238-df0e48367ff7?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const fallbackMetadata = {
  title: COMPANY_NAME,
  description: `Immerse yourself in a wealth of knowledge and diverse viewpoints at ${COMPANY_NAME}. Explore engaging articles, spark creativity, and join a vibrant community of thinkers. Elevate your online experience with our unique blend of ideas and perspectives.`,
  icons: {
    icon: "/favicon.ico",
  },
};

export const providers = {
  GOOGLE: "google",
  GITHUB: "github",
  EMAIL: "email",
};

// Cloudinary
export const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
export const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// Editor
export const WORDS_PER_MINUTE = 200;
export const TIME_PER_IMAGE = 0.083;
export const CHARACTER_LIMIT = 10000;

// Images Options
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Others
export const footerLinks = [
  { name: "help", url: "/help" },
  { name: "about", url: "/about" },
  { name: "privacy policy", url: "/privacy-policy" },
  { name: "terms & conditions", url: "/terms-and-conditions" },
  { name: "contact", url: "contact" },
  { name: "FAQs", url: "faqs" },
];

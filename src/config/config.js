import dotenv from "dotenv";
dotenv.config();


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
if (!process.env.PORT) {
    throw new Error("PORT is not defined in the environment variables");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV is not defined in the environment variables");
}
if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("CLOUDINARY_CLOUD_NAME is not defined in the environment variables");
}
if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error("CLOUDINARY_API_KEY is not defined in the environment variables");
}
if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("CLOUDINARY_API_SECRET is not defined in the environment variables");
}
if (!process.env.FRONTEND_URL) {
    throw new Error("FRONTEND_URL is not defined in the environment variables");
}

const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL
};

export default config;
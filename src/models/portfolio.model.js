import mongoose from "mongoose";

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: [String],
        required: true
    },
    projects: [
        {
            title: {
                type: String,
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true
            },
            image: {
                type: String,
                required: true
            },
            tags: {
                type: [String],
                required: true
            },
            codeLink: {
                type: String,
                required: true
            },
            liveLink: {
                type: String,
                required: true
            },
            category: {
                type: String,
                default: "Web Development",
                trim: true
            }
        }
    ],
    email: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    }
    
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;

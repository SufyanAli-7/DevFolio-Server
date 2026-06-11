import Portfolio from "../models/portfolio.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// 1. Get Logged-in User's Portfolio
export const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.id });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }
        res.status(200).json({ success: true, portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get Portfolio by Username (Public View)
export const getPortfolioByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ userName: { $regex: new RegExp(`^${username}$`, "i") } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const portfolio = await Portfolio.findOne({ userId: user._id });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }
        res.status(200).json({ success: true, portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Create or Full Update Portfolio
export const createPortfolio = async (req, res) => {
    try {
        const userId = req.id;
        const { name, role, bio, about, skills, email, github, linkedin, whatsapp } = req.body;

        let imagePath = "";
        if (req.files && req.files['image']) {
            const uploadResult = await uploadOnCloudinary(req.files['image'][0].path);
            if (!uploadResult) {
                return res.status(400).json({ success: false, message: "Failed to upload image to Cloudinary" });
            }
            imagePath = uploadResult.secure_url;
        }

        let portfolio = await Portfolio.findOne({ userId });

        const parsedSkills = typeof skills === "string" ? JSON.parse(skills) : skills;

        if (portfolio) {
            portfolio.name = name || portfolio.name;
            portfolio.role = role || portfolio.role;
            portfolio.bio = bio || portfolio.bio;
            portfolio.about = about || portfolio.about;
            portfolio.email = email || portfolio.email;
            portfolio.github = github || portfolio.github;
            portfolio.linkedin = linkedin || portfolio.linkedin;
            portfolio.whatsapp = whatsapp || portfolio.whatsapp;

            if (skills) {
                portfolio.skills = parsedSkills;
            }
            if (imagePath) {
                portfolio.image = imagePath;
            }

            await portfolio.save();
        } else {
            portfolio = new Portfolio({
                userId,
                name,
                role,
                image: imagePath || "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png",
                bio,
                about,
                skills: parsedSkills || [],
                projects: [],
                email,
                github,
                linkedin,
                whatsapp
            });
            await portfolio.save();
        }

        res.status(200).json({ success: true, message: "Portfolio saved successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Update Personal Info (Update Only)
export const updatePersonalInfo = async (req, res) => {
    try {
        const userId = req.id;
        const { name, role, bio } = req.body;

        let imagePath = "";
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(400).json({ success: false, message: "Failed to upload image to Cloudinary" });
            }
            imagePath = uploadResult.secure_url;
            console.log("imagePath", imagePath);
        }

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            // Auto-create initial portfolio with placeholder fields if user doesn't have one
            portfolio = new Portfolio({
                userId,
                name,
                role,
                image: imagePath || "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png",
                bio,
                about: "Welcome to my profile!",
                skills: [],
                projects: [],
                email: req.body.email || "email@example.com",
                github: "https://github.com",
                linkedin: "https://linkedin.com",
                whatsapp: "https://wa.me/0"
            });
        } else {
            portfolio.name = name || portfolio.name;
            portfolio.role = role || portfolio.role;
            portfolio.bio = bio || portfolio.bio;
            if (imagePath) {
                portfolio.image = imagePath;
            }
        }

        await portfolio.save();
        res.status(200).json({ success: true, message: "Personal info updated successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Update About (Update Only)
export const updateAbout = async (req, res) => {
    try {
        const userId = req.id;
        const { about } = req.body;

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found. Please setup Personal Info first." });
        }

        portfolio.about = about;
        await portfolio.save();
        res.status(200).json({ success: true, message: "About section updated successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 6. Update Social Links (Update Only)
export const updateSocialLinks = async (req, res) => {
    try {
        const userId = req.id;
        const { email, github, linkedin, whatsapp } = req.body;

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found. Please setup Personal Info first." });
        }

        portfolio.email = email || portfolio.email;
        portfolio.github = github || portfolio.github;
        portfolio.linkedin = linkedin || portfolio.linkedin;
        portfolio.whatsapp = whatsapp || portfolio.whatsapp;

        await portfolio.save();
        res.status(200).json({ success: true, message: "Social links updated successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 7. Add Skill (CRUD - Create)
export const addSkill = async (req, res) => {
    try {
        const userId = req.id;
        const { skill } = req.body;

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found. Please setup Personal Info first." });
        }

        if (portfolio.skills.includes(skill)) {
            return res.status(400).json({ success: false, message: "Skill already exists" });
        }

        portfolio.skills.push(skill);
        await portfolio.save();
        res.status(200).json({ success: true, message: "Skill added successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 8. Update Skill (CRUD - Update)
export const updateSkill = async (req, res) => {
    try {
        const userId = req.id;
        const { oldSkill } = req.params;
        const { newSkill } = req.body;

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }

        const skillIndex = portfolio.skills.indexOf(oldSkill);
        if (skillIndex === -1) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }

        portfolio.skills[skillIndex] = newSkill;
        portfolio.markModified("skills");
        await portfolio.save();
        res.status(200).json({ success: true, message: "Skill updated successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 9. Delete Skill (CRUD - Delete)
export const deleteSkill = async (req, res) => {
    try {
        const userId = req.id;
        const { skillName } = req.params;

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }

        portfolio.skills = portfolio.skills.filter(s => s !== skillName);
        await portfolio.save();
        res.status(200).json({ success: true, message: "Skill deleted successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 10. Add Project (CRUD - Create)
export const addProject = async (req, res) => {
    try {
        const userId = req.id;
        const { title, description, tags, codeLink, liveLink } = req.body;

        let imagePath = "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(400).json({ success: false, message: "Failed to upload project cover to Cloudinary" });
            }
            imagePath = uploadResult.secure_url;
        }

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found. Please setup Personal Info first." });
        }

        const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

        portfolio.projects.push({
            title,
            description,
            image: imagePath,
            tags: parsedTags || [],
            codeLink,
            liveLink
        });

        await portfolio.save();
        res.status(200).json({ success: true, message: "Project added successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 11. Update Project (CRUD - Update)
export const updateProject = async (req, res) => {
    try {
        const userId = req.id;
        const { projectId } = req.params;
        const { title, description, tags, codeLink, liveLink } = req.body;

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }

        const project = portfolio.projects.id(projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.codeLink = codeLink || project.codeLink;
        project.liveLink = liveLink || project.liveLink;

        if (tags) {
            project.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
        }

        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(400).json({ success: false, message: "Failed to upload project cover to Cloudinary" });
            }
            project.image = uploadResult.secure_url;
        }

        await portfolio.save();
        res.status(200).json({ success: true, message: "Project updated successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 12. Delete Project (CRUD - Delete)
export const deleteProject = async (req, res) => {
    try {
        const userId = req.id;
        const { projectId } = req.params;

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }

        portfolio.projects.pull({ _id: projectId });
        await portfolio.save();
        res.status(200).json({ success: true, message: "Project deleted successfully", portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

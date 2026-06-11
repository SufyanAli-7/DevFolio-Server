import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    createPortfolio, 
    getPortfolio, 
    getPortfolioByUsername, 
    updatePersonalInfo, 
    updateAbout, 
    updateSocialLinks,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject
} from "../controllers/portfolio.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const portfolioRouter = Router();

// General & Public routes
portfolioRouter.get('/me', authMiddleware, getPortfolio);
portfolioRouter.get('/username/:username', getPortfolioByUsername);
portfolioRouter.post('/create', authMiddleware, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'projectImages', maxCount: 15 }
]), createPortfolio);

// Manage Profile Sub-routes (Update Only)
portfolioRouter.put('/personal-info', authMiddleware, upload.single('image'), updatePersonalInfo);
portfolioRouter.put('/about', authMiddleware, updateAbout);
portfolioRouter.put('/social-links', authMiddleware, updateSocialLinks);

// Skills CRUD Sub-routes
portfolioRouter.post('/skills', authMiddleware, addSkill);
portfolioRouter.put('/skills/:oldSkill', authMiddleware, updateSkill);
portfolioRouter.delete('/skills/:skillName', authMiddleware, deleteSkill);

// Projects CRUD Sub-routes
portfolioRouter.post('/projects', authMiddleware, upload.single('image'), addProject);
portfolioRouter.put('/projects/:projectId', authMiddleware, upload.single('image'), updateProject);
portfolioRouter.delete('/projects/:projectId', authMiddleware, deleteProject);

export default portfolioRouter;
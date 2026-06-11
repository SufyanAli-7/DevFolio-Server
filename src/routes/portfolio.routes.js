import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPortfolio } from "../controllers/portfolio.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const portfolioRouter = Router();

portfolioRouter.post('/create', authMiddleware, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'projectImages', maxCount: 15 }
]), createPortfolio);

export default portfolioRouter;
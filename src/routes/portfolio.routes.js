import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPortfolio } from "../controllers/portfolio.controller.js";

const portfolioRouter = Router();

portfolioRouter.post('/create', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'projects', maxCount: 1 }
]), createPortfolio);

export default portfolioRouter;
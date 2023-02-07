import express from "express";
import customersRouter from "./customersRouter.js";
import gamesRouter from "./gamesRouter.js";

const router = express.Router();
router.use(gamesRouter);
router.use(customersRouter);
export default router;

import express from "express";
import customersRouter from "./customersRouter.js";
import gamesRouter from "./gamesRouter.js";
import rentalsRouter from "./rentalsRouter.js";

const router = express.Router();
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);
export default router;

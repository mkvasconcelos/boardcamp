import { Router } from "express";
import { gamesCreate, gamesRead } from "../controllers/gamesController.js";
import { gamesValidation } from "../middleware/schemaMiddleware.js";

const gamesRouter = Router();
gamesRouter.post("/games", gamesValidation, gamesCreate);
gamesRouter.get("/games", gamesRead);

export default gamesRouter;

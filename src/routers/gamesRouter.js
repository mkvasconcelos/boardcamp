import { Router } from "express";
import { gamesCreate, gamesRead } from "../controllers/gamesController.js";
import { gamesNameValidation } from "../middleware/gamesMiddleware.js";
import { gamesValidation } from "../middleware/schemaMiddleware.js";

const gamesRouter = Router();
gamesRouter.post("/games", gamesValidation, gamesNameValidation, gamesCreate);
gamesRouter.get("/games", gamesRead);

export default gamesRouter;

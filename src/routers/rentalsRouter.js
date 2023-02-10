import { Router } from "express";
import {
  rentalsCreate,
  rentalsDelete,
  rentalsFinish,
  rentalsRead,
} from "../controllers/rentalsController.js";
import { customersIdValidation } from "../middleware/customersMiddleware.js";
import {
  gamesIdValidation,
  gamesStockValidation,
} from "../middleware/gamesMiddleware.js";
import {
  rentalsFinishedValidation,
  rentalsIdValidation,
  rentalsReturnedValidation,
} from "../middleware/rentalsMiddleware.js";
import { rentalsValidation } from "../middleware/schemaMiddleware.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", rentalsRead);
rentalsRouter.post(
  "/rentals",
  rentalsValidation,
  gamesIdValidation,
  gamesStockValidation,
  customersIdValidation,
  rentalsCreate
);
rentalsRouter.post(
  "/rentals/:id/return",
  rentalsIdValidation,
  rentalsReturnedValidation,
  rentalsFinish
);
rentalsRouter.delete(
  "/rentals/:id",
  rentalsIdValidation,
  rentalsFinishedValidation,
  rentalsDelete
);

export default rentalsRouter;

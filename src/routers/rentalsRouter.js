import { Router } from "express";
import {
  rentalsCreate,
  rentalsFinish,
  rentalsRead,
} from "../controllers/rentalsController.js";
import { customersIdValidation } from "../middleware/customersMiddleware.js";
import {
  gamesIdValidation,
  gamesStockValidation,
} from "../middleware/gamesMiddleware.js";
import { rentalsIdValidation } from "../middleware/rentalsMiddleware.js";
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
rentalsRouter.post("/rentals/:id/return", rentalsIdValidation, rentalsFinish);

// rentalsRouter.post(
//   "/customers",
//   customersValidation,
//   customersDocumentValidation,
//   customersCreate
// );
// rentalsRouter.put(
//   "/customers/:id",
//   customersValidation,
//   customersDocumentValidation,
//   customersUpdate
// );

// rentalsRouter.get("/customers/:id", customersReadId);

export default rentalsRouter;

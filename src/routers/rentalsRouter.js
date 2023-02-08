import { Router } from "express";
import {
  rentalsCreate,
  rentalsRead,
} from "../controllers/rentalsController.js";
import { customersIdValidation } from "../middleware/customersMiddleware.js";
import { gamesIdValidation } from "../middleware/gamesMiddleware.js";
import { rentalsValidation } from "../middleware/schemaMiddleware.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", rentalsRead);
rentalsRouter.post(
  "/rentals",
  rentalsValidation,
  gamesIdValidation,
  customersIdValidation,
  rentalsCreate
);

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

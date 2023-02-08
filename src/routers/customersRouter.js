import { Router } from "express";
import {
  customersCreate,
  customersRead,
  customersReadId,
  customersUpdate,
} from "../controllers/customersController.js";
import {
  customersDocumentValidation,
  customersIdValidation,
} from "../middleware/customersMiddleware.js";
import { customersValidation } from "../middleware/schemaMiddleware.js";

const customersRouter = Router();
customersRouter.post(
  "/customers",
  customersValidation,
  customersDocumentValidation,
  customersCreate
);
customersRouter.put(
  "/customers/:id",
  customersValidation,
  customersIdValidation,
  customersDocumentValidation,
  customersUpdate
);
customersRouter.get("/customers", customersRead);
customersRouter.get("/customers/:id", customersIdValidation, customersReadId);

export default customersRouter;

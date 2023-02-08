import { Router } from "express";
import {
  customersCreate,
  customersRead,
  customersReadId,
  customersUpdate,
} from "../controllers/customersController.js";
import { customersDocumentValidation } from "../middleware/customersMiddleware.js";
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
  customersDocumentValidation,
  customersUpdate
);
customersRouter.get("/customers", customersRead);
customersRouter.get("/customers/:id", customersReadId);

export default customersRouter;

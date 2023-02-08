import { Router } from "express";
import {
  customersCreate,
  customersRead,
  customersReadId,
} from "../controllers/customersController.js";
import { customersValidation } from "../middleware/schemaMiddleware.js";

const customersRouter = Router();
customersRouter.post("/customers", customersValidation, customersCreate);
customersRouter.get("/customers", customersRead);
customersRouter.get("/customers/:id", customersReadId);

export default customersRouter;

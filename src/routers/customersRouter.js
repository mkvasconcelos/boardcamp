import { Router } from "express";
import {
  customersCreate,
  customersRead,
} from "../controllers/customersController.js";
import { customersValidation } from "../middleware/schemaMiddleware.js";

const customersRouter = Router();
customersRouter.post("/customers", customersValidation, customersCreate);
customersRouter.get("/customers", customersRead);

export default customersRouter;

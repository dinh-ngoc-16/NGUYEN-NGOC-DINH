import { Router } from "express";
import {
  getCoins,
  createCoin,
  getDetailCoin,
  deleteCoin,
  updateCoin,
} from "../controllers/coinController";
import { checkSchema } from "express-validator";

const userRouter = Router();

userRouter.get("/coins", getCoins);

userRouter.get("/coins/:coinCode", getDetailCoin);

userRouter.post(
  "/coins",
  checkSchema(
    {
      name: { trim: true, notEmpty: true },
      code: { trim: true, notEmpty: true },
      exchange: { optional: true, isNumeric: true },
      activeYn: { optional: true, trim: true, notEmpty: true },
    },
    ["body"],
  ),
  createCoin,
);

userRouter.patch(
  "/coins/:coinCode",
  checkSchema(
    {
      name: { optional: true, trim: true, notEmpty: true },
      code: { optional: true, trim: true, notEmpty: true },
      exchange: { optional: true, isNumeric: true },
      activeYn: { optional: true, trim: true, notEmpty: true },
    },
    ["body"],
  ),
  updateCoin,
);

userRouter.delete("/coins/:coinCode", deleteCoin);

export default userRouter;

import { Request, Response } from "express";
import Coin from "../models/coin";
import { validationResult, Result, ValidationError } from "express-validator";

//GET: all coin
export const getCoins = async (req: Request, res: Response): Promise<void> => {
  try {
    let page: number =
      req.query.page && req.query.page >= "1" ? Math.abs(+req.query.page) : 1;
    const limit: number = req.query.limit ? +req.query.limit : 10;
    const querySearch: string = req.query.search
      ? req.query.search.toString().trim()
      : "";
    const active: string = req.query.active
      ? req.query.active.toString().trim()
      : "";
    const result = await Promise.all([
      Coin.find({
        $and: [
          {
            $or: [
              { name: { $regex: querySearch, $options: "i" } },
              { code: { $regex: querySearch, $options: "i" } },
            ],
          },
          { activeYn: { $regex: active, $options: "i" } },
        ],
      })
        .sort([
          ["updatedAt", "desc"],
          ["createdAt", "desc"],
        ])
        .skip(--page * limit)
        .limit(Math.abs(limit)),
      Coin.estimatedDocumentCount({
        $and: [
          {
            $or: [
              { name: { $regex: querySearch, $options: "i" } },
              { code: { $regex: querySearch, $options: "i" } },
            ],
          },
          { activeYn: { $regex: active, $options: "i" } },
        ],
      }),
    ]);

    res.status(200).json({
      status: 200,
      data: result[0],
      totalItem: result[1],
      pageCurrent: page,
    });
  } catch (error: any) {
    res.status(200).json({
      status: 200,
      error: error.errorResponse,
      message: error.errorResponse.errmsg,
    });
  }
};

//GET: get detail coin
export const getDetailCoin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { coinCode } = req.params;

    const coinDetail = await Coin.findOne({
      code: coinCode,
    });

    if (!coinDetail) {
      res.status(404).json({ status: 404, message: "Coin not found" });
      return;
    }
    res.status(200).json({ status: 200, data: coinDetail });
  } catch (error: any) {
    res.status(200).json({
      status: 200,
      error: error.errorResponse,
      message: error.errorResponse.errmsg,
    });
  }
};

//POST: create new coin
export const createCoin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const validated: Result<ValidationError> = validationResult(req);
  const validatedResult = validated.mapped();

  if (Object.keys(validatedResult).length > 0) {
    res.status(200).send({ status: 200, error: validatedResult });
    return;
  }

  const coin = new Coin({
    ...req.body,
  });

  try {
    const data = await coin.save({ validateBeforeSave: true });

    res.status(201).json({
      status: 201,
      data: data,
      message: "Create new coin success!",
    });
  } catch (error: any) {
    console.log(error);
    res.status(200).json({
      status: 200,
      error: error.errorResponse,
      message: error.errorResponse.errmsg,
    });
  }
};

//PATCH: update the coin
export const updateCoin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validated: Result<ValidationError> = validationResult(req);
    const validatedResult = validated.mapped();

    if (Object.keys(validatedResult).length > 0) {
      res.status(200).send({ status: 200, error: validatedResult });
      return;
    }

    const { coinCode } = req.params;
    const coinInfo = req.body;
    const updatedCoin = await Coin.findOneAndUpdate(
      { code: coinCode },
      coinInfo,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedCoin) {
      res.status(404).json({ status: 404, message: "Coin not found" });
    } else {
      res.status(200).json({
        status: 200,
        data: updatedCoin,
        message: "Update Coin success!",
      });
    }
  } catch (error: any) {
    res.status(200).json({
      status: 200,
      error: error.errorResponse,
      message: error.errorResponse.errmsg,
    });
  }
};

//DELETE: delete the coin
export const deleteCoin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { coinCode } = req.params;

    const coinDeleted = await Coin.findOneAndDelete({ code: coinCode });

    if (!coinDeleted) {
      res.status(404).json({ status: 404, message: "Coin not found" });
    } else {
      res.status(200).json({
        status: 200,
        message: "Delete Coin success!",
        data: coinDeleted,
      });
    }
  } catch (error: any) {
    res.status(200).json({
      status: 200,
      error: error.errorResponse,
      message: error.errorResponse.errmsg,
    });
  }
};

import { customersSchema } from "../schemas/customersSchema.js";
import { gamesSchema } from "../schemas/gamesSchema.js";
import { rentalsSchema } from "../schemas/rentalsSchema.js";

export async function gamesValidation(req, res, next) {
  const { name, image, stockTotal, pricePerDay } = req.body;
  const newStockTotal = Number(stockTotal);
  const newPricePerDay = Number(pricePerDay);
  const { error } = gamesSchema.validate({
    name,
    image,
    stockTotal: newStockTotal,
    pricePerDay: newPricePerDay,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.locals.name = name;
  res.locals.image = image;
  res.locals.stockTotal = newStockTotal;
  res.locals.pricePerDay = newPricePerDay;
  next();
}

export async function customersValidation(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;
  const { error } = customersSchema.validate({
    name,
    phone,
    cpf,
    birthday,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.locals.name = name;
  res.locals.phone = phone;
  res.locals.cpf = cpf;
  res.locals.birthday = birthday;
  next();
}

export async function rentalsValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const newDaysRented = Number(daysRented);
  const newCustomerId = Number(customerId);
  const newGameId = Number(gameId);
  const { error } = rentalsSchema.validate({
    customerId: newCustomerId,
    gameId: newGameId,
    daysRented: newDaysRented,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.locals.customerId = newCustomerId;
  res.locals.gameId = newGameId;
  res.locals.daysRented = newDaysRented;
  next();
}

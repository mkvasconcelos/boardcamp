import { customersSchema } from "../schemas/customersSchema.js";

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

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Customer } = require('../../models/index');

const schema = Joi.object({
  name: Joi.string().min(5).max(60).required(),
  phoneNumber: Joi.number().min(1000000000).max(9999999999).required(),
  isGold: Joi.boolean().required(),
});

router.get('/', async (req, res) => {
  const customers = await Customer.find({}).sort('name');
  res.status(200).send(customers);
});

router.post('/', async (req, res) => {
  const result = await schema.validate(req.body);
  const { error } = result;
  if (!error) {
    let customers = new Customer({ name: req.body.name, phoneNumber: req.body.phoneNumber, isGold: req.body.isGold });
    customers = await customers.save();
    return res.status(200).send(customers);
  } else {
    //Bad request
    const [details] = error.details;
    console.log(details.message);
    return res.status(400).send(details.message);
  }
});

router.put('/:id', async (req, res) => {
  const result = schema.validate(req.body);
  if (!result.error) {
    const genre = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre) res.status(404).send('The genre not found');
    return res.status(200).send(genre);
  } else {
    //Bad request
    const [details] = result.error.details;
    console.log(details.message);
    return res.status(400).send("Customers'name is required");
  }
});

router.delete('/:id', async (req, res) => {
  const genre = await Customer.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre not found');
  res.status(200).send(genre);
});

//Route parameter
/** Query string params are also used using req.query  */
router.get('/:id', async (req, res) => {
  //res.send(req.params.id, req.params.year);
  const genre = await Customer.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre not found');
  res.status(200).send(genre);
});
module.exports = router;

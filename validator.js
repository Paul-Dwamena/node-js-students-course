const Joi = require('joi');

// Validate book data in req.body
const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  author: Joi.string().min(3).required(),
  year: Joi.number().integer().min(1000).max(2025).required(),
  genre: Joi.string().optional()
});

// Validate req.params (e.g., /books/:id)
const paramsSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required() // assuming MongoDB ObjectId
});

// Validate search query (e.g., /books/search?author=king&year=2020)
const querySchema = Joi.object({
  author: Joi.string().min(3).optional(),
  year: Joi.number().integer().optional(),
  title: Joi.string().optional()
});


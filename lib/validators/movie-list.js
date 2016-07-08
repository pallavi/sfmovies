'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  title: Joi.string().min(1).max(255).optional(),
  release_year: Joi.object().keys({
    eq: Joi.number().integer().min(1878).max(9999).optional(),
    gt: Joi.number().integer().min(1878).max(9999).optional(),
    lt: Joi.number().integer().min(1878).max(9999).optional()
  })
});

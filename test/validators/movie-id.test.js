'use strict';

const Joi = require('joi');

const MovieIdValidator = require('../../lib/validators/movie-id');

describe('movie id validator', () => {

  describe('id', () => {

    it('is required', () => {
      const params = {};
      const result = Joi.validate(params, MovieIdValidator);

      expect(result.error.details[0].path).to.eql('id');
      expect(result.error.details[0].type).to.eql('any.required');
    });
  })

})

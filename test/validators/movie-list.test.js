'use strict';

const Joi = require('joi');

const MovieListValidator = require('../../lib/validators/movie-list');

describe('movie list validator', () => {

  describe('title', () => {

    it('is optional', () => {
      const query = {};
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error).to.not.exist;
    });

    it('is not empty', () => {
      const query = { title: '' };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.empty');
    });

    it('is less than 255 characters', () => {
      const query = { title: 'a'.repeat(260) };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  })

  describe('release_year', () => {

    it('is optional', () => {
      const query = {};
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error).to.not.exist;
    });

    it('is after 1878', () => {
      const query = {
        title: 'foo',
        release_year: { eq: 1800 }
      };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error.details[0].path).to.eql('release_year.eq');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const query = {
        title: 'foo',
        release_year: { eq: 12345 }
      };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error.details[0].path).to.eql('release_year.eq');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  })
})

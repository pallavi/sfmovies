'use strict';

const Movies = require('../../../../lib/server');
const MovieFactory  = require('../../../../test/factories/movie');
const Knex          = require('../../../../lib/libraries/knex')

const movieOne  = MovieFactory.build({ title: 'Pulp Fiction', release_year: 1994 });
const movieTwo  = MovieFactory.build({ title: 'Inglorious Basterds', release_year: 2009 });

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('findAll', () => {

    beforeEach(() => {
      return Knex('movies').insert([movieOne, movieTwo]);
    });

    it('returns a list of movies', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.have.lengthOf(2);
      });
    });

  });

  describe('findById', () => {

    beforeEach(() => {
      return Knex('movies').insert([movieOne, movieTwo]);
    });

    it('returns a movie matching given id', () => {
      return Movies.inject({
        url: '/movies/3',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.id).to.eql(3);
      });
    });
  });

});

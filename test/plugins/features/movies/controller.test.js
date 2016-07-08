'use strict';

const Controller    = require('../../../../lib/plugins/features/movies/controller');
const Movie         = require('../../../../lib/models/movie');
const MovieFactory  = require('../../../../test/factories/movie');
const Knex          = require('../../../../lib/libraries/knex')

const movieOne  = MovieFactory.build({ title: 'Pulp Fiction', release_year: 1994 });
const movieTwo  = MovieFactory.build({ title: 'Inglorious Basterds', release_year: 2009 });


describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

  });

  describe('findAll', () => {

    beforeEach(() => {
      return Knex('movies').insert([movieOne, movieTwo]);
    });

    it('finds all movies', () => {
      const query = {};

      return Controller.findAll(query)
      .then((movies) => {
        expect(movies).to.have.lengthOf(2);
      });
    });

    it('finds movies matching title', () => {
      const query = { title: movieOne.title };

      return Controller.findAll(query)
      .then((movies) => {
        expect(movies.models[0].get('title')).to.eql(query.title);
      });
    });

    it('finds movies released in release_year', () => {
      const query = { release_year: { eq: movieTwo.release_year } };

      return Controller.findAll(query)
      .then((movies) => {
        expect(movies.models[0].get('release_year')).to.eql(query.release_year.eq);
      });
    });

    it('finds movies released before release_year', () => {
      const query = { release_year: { lt: movieOne.release_year + 1 } };

      return Controller.findAll(query)
      .then((movies) => {
        expect(movies.models[0].get('release_year')).to.be.below(query.release_year.lt);
      });
    });

    it('finds movies released after release_year', () => {
      const query = { release_year: { gt: movieTwo.release_year - 1 } };

      return Controller.findAll(query)
      .then((movies) => {
        expect(movies.models[0].get('release_year')).to.be.above(query.release_year.gt);
      });
    });
  });

  describe('findById', () => {

    beforeEach(() => {
      return Knex('movies').insert([movieOne, movieTwo]);
    })

    it('finds movie by id', () => {
      const params = { id: 1 };

      return Controller.findById(params.id)
      .then((movie) => {
        expect(movie.id).to.eql(params.id);
      });
    });

    it('returns nothing if no movie has given id', () => {
      const params = { id: 0 };

      return Controller.findById(params.id)
      .then((movie) => {
        expect(movie).to.not.exist;
      });
    })
  });

});

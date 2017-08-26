'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save({
    name: payload.title,
    release_year: payload.release_year
  })
  .then((movie) => new Movie({ id: movie.id }).fetch());
};

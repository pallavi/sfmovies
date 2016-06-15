'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.findAll = (query) => {
  return new Movie()
  .query((qb) => {
    if (query.title) {
      qb.where('title', '=', query.title);
    }

    if (query.release_year) {
      if (query.release_year.eq) {
        qb.where('release_year', '=', query.release_year.eq)
      }

      if (query.release_year.lt) {
        qb.where('release_year', '<', query.release_year.lt)
      }

      if (query.release_year.gt) {
        qb.where('release_year', '>', query.release_year.gt)
      }
    }

  })
  .orderBy('title', 'release_year')
  .fetchAll();
};

exports.findById = (id) => {
  return new Movie()
  .query((qb) => {
    qb.where('id', '=', id);
  })
  .fetch();
};

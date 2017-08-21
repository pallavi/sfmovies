'use strict';

const Movies = require('./data/movies');

exports.seed = function (Knex) {
  return Knex('movies').truncate()
  .then(() => Knex('movies').insert(Movies));
};

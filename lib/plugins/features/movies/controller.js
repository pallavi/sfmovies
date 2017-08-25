'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  const payloadWithName = Object.assign({ name: payload.title }, payload);
  return new Movie().save(payloadWithName)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};

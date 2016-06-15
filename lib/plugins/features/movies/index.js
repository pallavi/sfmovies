'use strict';

const Controller         = require('./controller')
const MovieValidator     = require('../../../validators/movie');
const MovieListValidator = require('../../../validators/movie-list.js');
const MovieIdValidator   = require('../../../validators/movie-id.js');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator
      }
    }
  },

  {
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.findAll(request.query));
      },
      validate: {
        query: MovieListValidator
      }
    }
  },

  {
    method: 'GET',
    path: '/movies/{id}',
    config: {
      handler: (request, reply) => {
        reply(Controller.findById(request.params.id));
      },
      validate: {
        params: MovieIdValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};

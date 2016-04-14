import Hapi from 'hapi';
import path from 'path';
import nunjucks from 'nunjucks';

const server = new Hapi.Server({
  debug: {
    request: ['error']
  }
});
server.connection({
  host: 'localhost',
  port: 8001
});

const APP_FILE_PATH = '/application.js';
server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/build/application.js');
  }
});

const JSON_FILE_PATH = '/data.json';
server.route({
  method: 'GET',
  path: JSON_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/components/pages/Home/data.json');
  }
});

const SLIDEOUT_FILE_PATH = '/slideout.js';
server.route({
  method: 'GET',
  path: SLIDEOUT_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/slideout.js');
  }
});

server.route({
  method: 'GET',
  path: '/templates/{template*}',
  handler: {
    file: (request) => {
      return path.join('dist', request.params.template);
    }
  }
});

server.route({
    method: 'GET',
    path: '/{file}.css',
    handler: function (request, reply) {
        reply.file("dist/styles/"+request.params.file+".css");
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'dist/imgs/'
        }
    }
});


export default {
  nunjucks: './dist',
  server: server,
  document: function (application, controller, request, reply, body, callback) {
    nunjucks.render('./index.html', {
      body: body,
      application: APP_FILE_PATH,
      state: controller.serialize(),
    }, (err, html) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, html);
    });
  }
};
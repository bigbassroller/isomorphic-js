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

const DATA_FILE_PATH = '/data.json';
server.route({
  method: 'GET',
  path: DATA_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/components/pages/Home/data.json');
  }
});

const PORTFOLIO_DATA_FILE_PATH = '/portfolio.json';
server.route({
  method: 'GET',
  path: PORTFOLIO_DATA_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/components/pages/Home/portfolio.json');
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
        reply.file("dist/assets/css/"+request.params.file+".css");
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'dist/assets/imgs/'
        }
    }
});

server.route({
    method: 'GET',
    path: '/FontAwesome.otf',
    handler: function (request, reply) {
        reply.file('dist/assets/fonts/font-awesome/fonts/FontAwesome.otf');
    }
});

server.route({
    method: 'GET',
    path: '/fontawesome-webfont.eot',
    handler: function (request, reply) {
        reply.file('dist/assets/fonts/font-awesome/fonts/fontawesome-webfont.eot');
    }
});

server.route({
    method: 'GET',
    path: '/fontawesome-webfont.svg',
    handler: function (request, reply) {
        reply.file('dist/assets/fonts/font-awesome/fonts/fontawesome-webfont.svg');
    }
});

server.route({
    method: 'GET',
    path: '/fontawesome-webfont.ttf',
    handler: function (request, reply) {
        reply.file('dist/assets/fonts/font-awesome/fonts/fontawesome-webfont.ttf');
    }
});

server.route({
    method: 'GET',
    path: '/fontawesome-webfont.woff',
    handler: function (request, reply) {
        reply.file('dist/assets/fonts/font-awesome/fonts/fontawesome-webfont.woff');
    }
});

server.route({
    method: 'GET',
    path: '/fontawesome-webfont.woff2',
    handler: function (request, reply) {
        reply.file('dist/assets/fonts/font-awesome/fonts/fontawesome-webfont.woff2');
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
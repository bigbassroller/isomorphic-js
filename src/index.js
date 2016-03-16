import Hapi from 'hapi';
import nunjucks from 'nunjucks';

// configure nunjucks to read from the dist directory
nunjucks.configure('./dist');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
       nunjucks.render('index.html', {
       	fname: 'Michael', lname: 'Chavez'
       }, function (err, html) {
       	reply(html);
       })
    }
});

// Start the server
server.start();
import Hapi from 'hapi';
import Application from './lib';
import nunjucks from 'nunjucks';
import Controller from './lib/controller';

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

const application = new Application({
	'/': Controller
}, {
	server
})

application.start();
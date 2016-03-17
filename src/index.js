import Hapi from 'hapi';
import Application from './lib';
import Controller from './lib/controller';
import HelloController from './hello-controller';

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

const application = new Application({
	'/': Controller,
	'/hello/{name*}': HelloController
}, {
	server: server
});

application.start();
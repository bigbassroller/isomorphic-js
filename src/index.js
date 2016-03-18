import Application from './lib';
import HelloController from './HelloController';
import HomeController from './HomeController';
import AboutController from './AboutController';
import nunjucks from 'nunjucks';
import options from './options';

nunjucks.configure(options.nunjucks);

const application = new Application({
  '/hello/{name*}': HelloController,
  '/': HomeController,
  '/about': AboutController
}, options);

application.start();
import Application from './lib';
import HelloController from './components/pages/Hello/HelloController';
import HomeController from './components/pages/Home/HomeController';
import AboutController from './components/pages/About/AboutController';
import nunjucks from 'nunjucks';
import options from './options';

nunjucks.configure(options.nunjucks);

const application = new Application({
  '/hello/{name*}': HelloController,
  '/': HomeController,
  '/about': AboutController
}, options);

application.start();
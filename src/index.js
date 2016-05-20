import Application from './lib';
import HelloController from './components/pages/Hello/HelloController';
import HomeController from './components/pages/Home/HomeController';
import AboutController from './components/pages/About/AboutController';
import BlogController from './components/pages/Blog/BlogController';
import TodosController from './components/pages/Todos/TodosController';
import nunjucks from 'nunjucks';
import options from './options';

nunjucks.configure(options.nunjucks);

const application = new Application({
  '/hello/{name*}': HelloController,
  '/': HomeController,
  '/about': AboutController,
  '/blog': BlogController,
  '/todos': TodosController
}, options);

application.start();
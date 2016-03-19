import Application from './lib';
import HelloController from './components/pages/Hello/HelloController';
import HomeController from './components/pages/Home/HomeController';
import AboutController from './components/pages/About/AboutController';
import PortfolioController from './components/pages/Portfolio/PortfolioController';
import BlogController from './components/pages/Blog/BlogController';
import ContactController from './components/pages/Contact/ContactController';
import nunjucks from 'nunjucks';
import options from './options';

nunjucks.configure(options.nunjucks);

const styles = 'assets/css/main.min.css';

const application = new Application({
  '/hello/{name*}': HelloController,
  '/': HomeController,
  '/about': AboutController,
  '/portfolio': PortfolioController,
  '/blog': BlogController,
  '/contact': ContactController,
}, options);

application.start();
import Controller from '../../../lib/Controller';
import nunjucks from 'nunjucks';
import Trianlify from 'trianglify';

function onClick(e) {
  console.log(e.currentTarget);
}

function ignitor(context) {
  // default values
  let name = {
    cloud1: '/cloud-1.png',
    cloud2: '/cloud-2.png',
    cloud3: '/cloud-3.png'
  };

  return name;
}

export default class HomeController extends Controller {

  toString(callback) {
    // this can be handled more eloquently using Object.assign
    // but we are not including the polyfill dependency
    // for the sake of simplicity
    let context = ignitor(this.context);

    nunjucks.render('components/pages/Home/home.html', context, (err, html) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, html);
    });
  }

  attach(el) {
    console.log(this.context.data.random);
    this.clickHandler = el.addEventListener('click', onClick, false);
  }

  detach(el) {
    el.removeEventListener('click', onClick, false);
  }

}
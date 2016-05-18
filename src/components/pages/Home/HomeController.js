import "babel-polyfill";
import Controller from '../../../lib/controller';
import nunjucks from 'nunjucks';
import fetch from "isomorphic-fetch";
import promise from "es6-promise";


function onClick(e) {
  console.log(e.currentTarget);
}
  
function getName(context) {
 let data = {
  "name": "The dude"
 }
 return data;
}


export default class HomeController extends Controller {


  index(application, request, reply, callback) {
    this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/' });
    callback(null);
  }

  toString(callback) {

    // Works 
    let context = getName(this.context);

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
import Controller from '../../../lib/controller';
import nunjucks from 'nunjucks';
import { getUsefulContents } from '../../../lib/ajax';
import objectAssign from 'object-assign';
import $ from 'jquery';
import jQuery from 'jquery';
import window from 'window-shim';
import data from './data.json';

window.$ = $;
window.jQuery = jQuery;

if (window.jQuery) {  
    console.log('jquery')
} else {
    console.log('no jquery')
}

function onClick(e) {
  console.log(e.currentTarget);
}

function getData(context) {
 let name = data;

 return name;
}

export default class HomeController extends Controller {


  index(application, request, reply, callback) {
    this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/' });
    this.context.data = { random: Math.floor(Math.random() * 1000) + 1 };
    callback(null);
  }

  toString(callback) {
    // this can be handled more eloquently using Object.assign
    // but we are not including the polyfill dependency
    // for the sake of simplicity
    let context = getData(this.context);
    context.data = this.context.data;

    let colors = ["red", "blue", "green"];

    let item = colors.shift();

    // console.log(item);

    let numbers = [0, 1, 5, 10, 15];

    var mapResult = numbers.map(function(item, index, array) {
      return item + " Hell ya! You just got mapped! "
    })

    // console.log(this);

    // let values = [0, 1, 5, 10, 15];

    // function compare(value1, value2) {
    //   if (value1 < value2) {
    //     return -1;
    //   } else if (value1 > value2) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // }

    // function compare(value1, value2) {
    //   return value1 - value2;
    // }

    // values.sort(compare);
    // console.log(values);


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
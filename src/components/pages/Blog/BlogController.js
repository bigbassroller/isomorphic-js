import "babel-polyfill";
import Controller from '../../../lib/controller';
import nunjucks from 'nunjucks';
import objectAssign from 'object-assign';
import $ from 'jquery';
import jQuery from 'jquery';
import window from 'window-shim';
import Rx from 'rxjs/Rx';
import {RxHttpRequest} from 'rx-http-request';

function onClick(e) {
  console.log(e.currentTarget);
}

function getName(context) {
  // default values
  let name = {
    fname: 'Michael',
    lname: 'Chavez'
  };

  return name;
}

function getData() {
  const options = {
      qs: {
          
      },
      headers: {
          'User-Agent': 'RX-HTTP-Request'
      },
      json: true // Automatically parses the JSON string in the response 
  };
   
  RxHttpRequest.get('http://localhost:8001/api/blog', options).subscribe(
      (data) => {
   
          if (data.response.statusCode === 200) {
              let json = JSON.stringify(data);
              console.log('this is data from the server', data); // Show the JSON response object. 
              console.log('This is the json ', json)
              return json;
          }
      },
      (err) => console.error(err) // Show error in console 
  );
}

let callData = getData();

export default class BlogController extends Controller {


  index(application, request, reply, callback) {
    this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/' });
    this.context.data = { random: Math.floor(Math.random() * 1000) + 1 };
    this.context.blogPosts =  getData(this.data);
    callback(null);
  }

  toString(callback) {

    // this can be handled more eloquently using Object.assign
    // but we are not including the polyfill dependency
    // for the sake of simplicity
    let context = getName(this.context);
    context.data = this.context.data;
    // context.blogPosts = this.context.blogPosts;

    nunjucks.render('components/pages/Blog/blog.html', context, (err, html) => {
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
import "babel-polyfill";
import Controller from '../../../lib/controller';
import nunjucks from 'nunjucks';


function onClick(e) {
  console.log(e.currentTarget);
}

function getName(context) {
  // default values
  let name = {
    fname: 'Michael',
    lname: 'Chavez'
  };
  // split path params
  let nameParts = context.params.name ? context.params.name.split('/') : [];

  // order of precedence
  // 1. path param
  // 2. query param
  // 3. default value
  name.fname = (nameParts[0] || context.query.fname) ||
    name.fname;
  name.lname = (nameParts[1] || context.query.lname) ||
    name.lname;

  return name;
}

export default class TodosController extends Controller {


  index(application, request, reply, callback) {
    this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/' });
    this.context.todos =  [
        {
          "title": "Todos Tomorrow",
          "cover_photo": "hello-tomorrow.png",
          "slug": "hello-world",
          "entry_title": "Hello Tomorrow, How are You?",
          "entry_content": "Hello Tomorrow, Aliquam sagittis massa Ma nizzle maurizzle.",
          "featured_image": "hello-tomorrow.png",
          "categories": [
            "category 1",
            "category 2",
            "category 3"
          ],
          "id": 3
        },
        {
          "title": "Hello Again",
          "cover_photo": "hello-again.png",
          "slug": "hello-world",
          "entry_title": "Hello Again, Its a Fine Day Again",
          "entry_content": "People open windows again. Aliquam sagittis massa Ma nizzle maurizzle.",
          "featured_image": "hello-world-again-banner.png",
          "categories": [
            "category 1",
            "category 2",
            "category 3"
          ],
          "id": 2
        },
        {
          "title": "Hello World",
          "cover_photo": "hello-world.png",
          "slug": "hello-world",
          "entry_title": "Hello World, Its a Fine Day",
          "entry_content": "People open windows. Aliquam sagittis massa Ma nizzle maurizzle.",
          "featured_image": "hello-world-banner.png",
          "categories": [
            "category 1",
            "category 2",
            "category 3"
          ],
          "id": 1
        }
      ];
    callback(null);
  }

  toString(callback) {

    // this can be handled more eloquently using Object.assign
    // but we are not including the polyfill dependency
    // for the sake of simplicity
    let context = {};
    context.todos = this.context.todos;

    nunjucks.render('components/pages/Todos/todos.html', context, (err, html) => {
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
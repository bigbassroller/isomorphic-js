import Controller from '../../../lib/controller';
import nunjucks from 'nunjucks';
import { getUsefulContents } from '../../../lib/ajax';


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

// function jsonTextFunc(context) {

//   let dummy = [
//     {
//       "_id": "570ff9cffc2a8791c3d30ab9",
//       "index": 0,
//       "guid": "76cb312d-3536-4d23-af33-5a6477bad224",
//       "isActive": false,
//       "balance": "$2,131.97",
//       "picture": "http://placehold.it/32x32",
//       "age": 31,
//       "eyeColor": "brown",
//       "name": "Yates Bray",
//       "gender": "male",
//       "company": "CENTURIA",
//       "email": "yatesbray@centuria.com",
//       "phone": "+1 (916) 551-3120",
//       "address": "775 Miller Avenue, Faywood, Oregon, 7624",
//       "about": "Tempor cillum ea sint aute aute sint mollit ad. Elit deserunt ex irure qui adipisicing proident nisi culpa consequat cillum velit eu. Exercitation exercitation dolor quis ex sint ad ut commodo aute deserunt labore reprehenderit. Culpa non ea voluptate deserunt aliqua laborum officia id. Aliquip anim aute commodo anim aliqua ad sit amet consectetur ea quis labore commodo nisi. Deserunt adipisicing et dolore proident sint occaecat aliqua eiusmod ullamco nostrud occaecat. Officia qui officia non do adipisicing Lorem.\r\n",
//       "registered": "2015-11-16T12:30:16 +08:00",
//       "latitude": 2.395381,
//       "longitude": 12.501558,
//       "tags": [
//         "consequat",
//         "ut",
//         "elit",
//         "elit",
//         "est",
//         "cillum",
//         "nisi"
//       ],
//       "friends": [
//         {
//           "id": 0,
//           "name": "Boyd Brock"
//         },
//         {
//           "id": 1,
//           "name": "Ada Colon"
//         },
//         {
//           "id": 2,
//           "name": "Bessie Hester"
//         }
//       ],
//       "greeting": "Hello, Yates Bray! You have 3 unread messages.",
//       "favoriteFruit": "apple"
//     },
//     {
//       "_id": "570ff9cf67648f3fa282e3a7",
//       "index": 1,
//       "guid": "e0fe2d1d-7490-42e1-891b-ab900e21d324",
//       "isActive": true,
//       "balance": "$1,133.20",
//       "picture": "http://placehold.it/32x32",
//       "age": 24,
//       "eyeColor": "green",
//       "name": "Queen Porter",
//       "gender": "female",
//       "company": "TUBESYS",
//       "email": "queenporter@tubesys.com",
//       "phone": "+1 (835) 495-2185",
//       "address": "177 Canarsie Road, Hillsboro, South Carolina, 2981",
//       "about": "Enim quis exercitation duis aliqua enim laboris cillum eiusmod et esse quis ex. Nostrud nisi labore nisi Lorem. Labore adipisicing amet magna ex excepteur minim nulla tempor veniam anim occaecat eu sit. Veniam eiusmod dolore minim proident magna dolor aliquip. Cillum dolore reprehenderit laborum eiusmod fugiat consequat dolor eiusmod sit nisi officia aliquip velit excepteur.\r\n",
//       "registered": "2014-01-10T02:46:37 +08:00",
//       "latitude": 42.387913,
//       "longitude": -142.546841,
//       "tags": [
//         "culpa",
//         "nisi",
//         "consectetur",
//         "et",
//         "cillum",
//         "mollit",
//         "sunt"
//       ],
//       "friends": [
//         {
//           "id": 0,
//           "name": "Bridget Fields"
//         },
//         {
//           "id": 1,
//           "name": "Adela Hampton"
//         },
//         {
//           "id": 2,
//           "name": "Kelly Mills"
//         }
//       ],
//       "greeting": "Hello, Queen Porter! You have 6 unread messages.",
//       "favoriteFruit": "strawberry"
//     },
//     {
//       "_id": "570ff9cf3b88e99419a82430",
//       "index": 2,
//       "guid": "60efa250-1014-4f5d-b3a2-d06b631ef098",
//       "isActive": true,
//       "balance": "$3,708.70",
//       "picture": "http://placehold.it/32x32",
//       "age": 23,
//       "eyeColor": "blue",
//       "name": "Moreno Barrett",
//       "gender": "male",
//       "company": "LINGOAGE",
//       "email": "morenobarrett@lingoage.com",
//       "phone": "+1 (838) 539-2901",
//       "address": "432 Bliss Terrace, Whitestone, Arizona, 6365",
//       "about": "Quis exercitation ut sunt eu culpa amet deserunt aliqua laboris consectetur. Laboris cillum aliquip incididunt voluptate tempor aliquip cillum in id cillum non ea. Ipsum incididunt id id eiusmod excepteur. Sunt duis commodo et non ipsum dolore adipisicing est occaecat. Reprehenderit dolor nostrud aute commodo minim magna nisi minim nostrud minim ad.\r\n",
//       "registered": "2014-05-07T10:40:48 +07:00",
//       "latitude": -14.055686,
//       "longitude": -69.692664,
//       "tags": [
//         "exercitation",
//         "eu",
//         "fugiat",
//         "veniam",
//         "enim",
//         "eu",
//         "minim"
//       ],
//       "friends": [
//         {
//           "id": 0,
//           "name": "Hurst Wilkerson"
//         },
//         {
//           "id": 1,
//           "name": "Horne Buckner"
//         },
//         {
//           "id": 2,
//           "name": "Sloan Santiago"
//         }
//       ],
//       "greeting": "Hello, Moreno Barrett! You have 6 unread messages.",
//       "favoriteFruit": "banana"
//     },
//     {
//       "_id": "570ff9cfd59dabdb2fae8228",
//       "index": 3,
//       "guid": "716c0ab6-85ea-4dd9-a591-d00ae4744da3",
//       "isActive": true,
//       "balance": "$3,628.33",
//       "picture": "http://placehold.it/32x32",
//       "age": 36,
//       "eyeColor": "blue",
//       "name": "Craft Oneal",
//       "gender": "male",
//       "company": "QUILCH",
//       "email": "craftoneal@quilch.com",
//       "phone": "+1 (801) 541-2078",
//       "address": "665 Ford Street, Crown, Wyoming, 5081",
//       "about": "Deserunt culpa dolore esse aliquip fugiat cupidatat nostrud nostrud magna excepteur. Lorem consequat sit culpa est excepteur amet labore. Cupidatat quis id nisi reprehenderit occaecat sint commodo tempor. Exercitation ut ipsum adipisicing Lorem laborum id proident qui aliquip.\r\n",
//       "registered": "2014-02-20T02:04:16 +08:00",
//       "latitude": -25.852627,
//       "longitude": -10.566694,
//       "tags": [
//         "excepteur",
//         "consectetur",
//         "qui",
//         "ea",
//         "adipisicing",
//         "mollit",
//         "magna"
//       ],
//       "friends": [
//         {
//           "id": 0,
//           "name": "Jordan Cantu"
//         },
//         {
//           "id": 1,
//           "name": "Jenifer Pugh"
//         },
//         {
//           "id": 2,
//           "name": "Terri Dillard"
//         }
//       ],
//       "greeting": "Hello, Craft Oneal! You have 9 unread messages.",
//       "favoriteFruit": "apple"
//     },
//     {
//       "_id": "570ff9cf00628d37e39b993e",
//       "index": 4,
//       "guid": "f8786eb5-783e-4792-bd9b-6bb76c8cbce4",
//       "isActive": false,
//       "balance": "$3,758.99",
//       "picture": "http://placehold.it/32x32",
//       "age": 23,
//       "eyeColor": "brown",
//       "name": "Liliana Hill",
//       "gender": "female",
//       "company": "ZAYA",
//       "email": "lilianahill@zaya.com",
//       "phone": "+1 (886) 518-3981",
//       "address": "736 Belmont Avenue, Robinson, North Dakota, 1163",
//       "about": "Voluptate dolor ad elit Lorem esse irure duis aliquip sunt duis. Consectetur adipisicing minim esse ut duis anim ullamco dolore eiusmod deserunt sint. Eiusmod do quis sunt sit sit aute irure adipisicing aliquip ad enim incididunt in. Ea qui ut sint ea. Mollit quis eiusmod quis elit enim eiusmod ex. Dolore minim reprehenderit non adipisicing nulla occaecat id est. Sint velit ex sit velit consequat tempor laborum aute.\r\n",
//       "registered": "2014-08-10T01:31:20 +07:00",
//       "latitude": -74.960504,
//       "longitude": -14.404548,
//       "tags": [
//         "ea",
//         "mollit",
//         "officia",
//         "consequat",
//         "pariatur",
//         "anim",
//         "sit"
//       ],
//       "friends": [
//         {
//           "id": 0,
//           "name": "Owen Riddle"
//         },
//         {
//           "id": 1,
//           "name": "Vonda Banks"
//         },
//         {
//           "id": 2,
//           "name": "Cleveland Myers"
//         }
//       ],
//       "greeting": "Hello, Liliana Hill! You have 10 unread messages.",
//       "favoriteFruit": "apple"
//     },
//     {
//       "_id": "570ff9cf89b4237ee721d73f",
//       "index": 5,
//       "guid": "e5fa5b55-2166-49bc-8ff7-b95fa35bd8eb",
//       "isActive": true,
//       "balance": "$3,511.15",
//       "picture": "http://placehold.it/32x32",
//       "age": 34,
//       "eyeColor": "brown",
//       "name": "Pace Mcdowell",
//       "gender": "male",
//       "company": "CORECOM",
//       "email": "pacemcdowell@corecom.com",
//       "phone": "+1 (911) 485-2693",
//       "address": "291 Noll Street, Bend, Virgin Islands, 7174",
//       "about": "Eiusmod velit tempor dolor deserunt mollit fugiat ipsum anim sunt anim duis sint non. Commodo anim ipsum proident dolore. Dolore nulla aute consequat velit consectetur magna duis aute est nulla. Reprehenderit et sunt aute nulla ea consequat anim officia. Sint cupidatat officia minim nisi mollit. Incididunt ad ullamco eiusmod voluptate mollit. Ex id nulla amet Lorem do commodo non et labore non dolor enim reprehenderit excepteur.\r\n",
//       "registered": "2014-06-06T02:18:20 +07:00",
//       "latitude": 34.750873,
//       "longitude": -160.706124,
//       "tags": [
//         "et",
//         "ea",
//         "sit",
//         "voluptate",
//         "duis",
//         "reprehenderit",
//         "pariatur"
//       ],
//       "friends": [
//         {
//           "id": 0,
//           "name": "Cortez Cleveland"
//         },
//         {
//           "id": 1,
//           "name": "Spence Murray"
//         },
//         {
//           "id": 2,
//           "name": "Loretta Hodges"
//         }
//       ],
//       "greeting": "Hello, Pace Mcdowell! You have 4 unread messages.",
//       "favoriteFruit": "banana"
//     },
//     {
//       "_id": "570ff9cf6028f6360fc265c4",
//       "index": 6,
//       "guid": "365c7473-709a-43dc-9988-f55d971bc1de",
//       "isActive": false,
//       "balance": "$3,864.09",
//       "picture": "http://placehold.it/32x32",
//       "age": 31,
//       "eyeColor": "green",
//       "name": "Buck Mckenzie",
//       "gender": "male",
//       "company": "GEEKNET",
//       "email": "buckmckenzie@geeknet.com",
//       "phone": "+1 (829) 558-2243",
//       "address": "535 Post Court, Stockwell, Idaho, 7130",
//       "about": "Eiusmod irure cillum exercitation sunt irure. Do exercitation reprehenderit elit id eiusmod ipsum in veniam proident laboris. Culpa occaecat et irure minim nisi ullamco ad incididunt enim voluptate occaecat consectetur esse esse. Incididunt mollit tempor esse consequat exercitation dolor incididunt ad ullamco velit ad ad. Laborum pariatur nisi duis adipisicing non.\r\n",
//       "registered": "2014-03-24T09:02:53 +07:00",
//       "latitude": -47.998154,
//       "longitude": -113.981118,
//       "tags": [
//         "sit",
//         "deserunt",
//         "quis",
//         "consequat",
//         "occaecat",
//         "ea",
//         "exercitation"
//       ],
//       "friends": [
//         {
//           "id": 0,
//           "name": "Newton Curry"
//         },
//         {
//           "id": 1,
//           "name": "Pickett Kirby"
//         },
//         {
//           "id": 2,
//           "name": "Ballard Beck"
//         }
//       ],
//       "greeting": "Hello, Buck Mckenzie! You have 1 unread messages.",
//       "favoriteFruit": "apple"
//     }
//   ]

//   let jsonText = JSON.stringify(dummy, ["balance", "company"]);

//   return jsonText;

// }

getUsefulContents("http://localhost:8001/data.json", data => {
  console.log(data);
});

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
    let context = getName(this.context);
    context.data = this.context.data;

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
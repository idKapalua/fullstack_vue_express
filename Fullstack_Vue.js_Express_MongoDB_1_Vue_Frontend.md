Refer to : https://www.youtube.com/watch?v=j55fHUJqtyw

> Preparation
* VS code extensions
    * vueter
    * vue2 snippets
    * bracket pair colorizer
    * prittier

> Project Getting Start
  * create and move to folder (./fullstack_vue_express)
  * npm init
    * package name : fullstack_vue_express
    * version : (default v1.0.0)
    * description : Full stack vue and express app
    * entry point : index.js
    * test command : (enter)
    * author : David Ji
    * License : (enter)
* npm i express cors body-parser mongodb
  * cors : annoying chrome errors (study more)

* npm i -D nodemon

* update "scripts" in package.json
  * delete all and write below items
``` json
        "scripts" : {
            "start" : "node server/index.js",
            "dev" : "nodemon server/index.js"
        }
```
* create ./server folder
* write code

``` js 
    // file : ./server/index.js
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');


    const app = express();

    // Middleware
    app.use(bodyParser.json());
    app.use(cors());

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port}`)); // use back tick
```

* npm run dev
``` js
    // execution message
    fullstack_vue_express@1.0.0 dev /Users/jibongil/Git/Projects/fullstack_vue_express
    nodemon server/index.js
    [nodemon] 2.0.7
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node server/index.js`
    Server started on port 5000
```

* Go to localhost:5000/ via Chrome
  * (You will get) ```Cannot Get / ```
  * Slash(/) is main end-point

* Add Routes to app
  * create folder and file ./server/routes/api/posts.js
  * code
    ``` js
    // file : ./index.js
    ...
    const posts = require('./server/api/posts/posts.js');
    ...
    // app will route take over from body-parser and direct to posts
    app.use('/api/posts', posts);

    ```
  * (now error. because we haven't set router posts.js)

* code posts.js
    ```js
    const express = require('express'); // bring express
    const mongodb = require('mongodb'); // bring mongodb driver

    const router = express.Router();

    module.exports = router;

    ```

* add router (get/add/delete) to handling request
    ```js
    ...
    // file : ./server/api/posts/posts.js

    // get posts
    router.get('/', (req,res) => {
        res.send('hello');
    } );

    // add post
    

    // delete post
    
    ...
    ```
* localhost:5000/api/posts
  * hello (okay)

* mongodb & compass
  * https://www.mongodb.com/try/download/community
  * move mongodb package to /usr/local/mongodb
  * create folder to data live on ~/data/db
  * Regist PATH
  ``` bash
    // file : ~/.bash_profile
    ...
    export MONGO_PATH=/usr/local/mongodb
    export PATH=$PATH:$MONGO_PATH/bin
    ...
  ```

* code GET/POST/DELETE Handling

  ```js
    // file : ./server/api/posts/posts.js
    // ...
    
    // Get post
    // Slash('/') actually mean localhost:5000/api/posts/
    router.get('/', async (req,res) => {
        const posts = await loadPostCollection();
        res.send(await posts.find({}).toArray());
    });

    // Add post
    router.post('/', async (req,res) => {
        const posts = await loadPostCollection();
        posts.insertOne({
            text : req.body.text,
            createdAt: new Date()
        });
        res.status(201).send();
    });

    // delete post
    router.delete('/:id',async (req,res) => {
        const posts = await loadPostCollection();
        await posts.deleteOne({_id : new mongodb.ObjectID(req.params.id)});
        res.status(200).send();
        
    });

    // get mongoDB collection 
    async function loadPostCollection()
    {
        const client = await mongodb.MongoClient.connect
        ('mongodb://127.0.0.1:27017', {
            useNewUrlParser:true
        });
        
        return client.db('vue_express').collection('posts');
    }
    ```

* Testing with PostMan
  * POSTMan
    * postman can make all types of HTTP request
    * GET/POST/DELETE etc.,..
  * [GET] http://localhost:5000/api/posts
    1. Send
  * [POST] http://localhost:5000/api/posts
    1. (header) content-type : application-json
    2. (body) on raw mode, { "text" : "This is post 1" } 
    3. Send
  * [DELETE] http://localhost:5000:api/posts/id
    1. Get id to delete from GET response (mongodb ID)
    2. put id value on URL
    3. Send
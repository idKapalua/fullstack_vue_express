
> https://www.youtube.com/watch?v=W-b9KGwVECs&t=601s

> proxy (frontend to backend)
  * create vue.config.js file
```js
  // file : ./client/vue.config.js
  const path = require('path');

  module.exports = {
    // put output of frontend building to ./backend/public
    outputDir: path.resolve(__dirname, '../server/public'),

    //connect to localhost:8080 (ok)
    //reload front-end server (stop and restart)
    devServer: {
      proxy: {
        'api/posts': {
          target: 'http://localhost:5000'
        }
      }
    }
  }

```

> ```npm run build```
* (./client) ```npm run build``` will populate static assets to ./server/public folder
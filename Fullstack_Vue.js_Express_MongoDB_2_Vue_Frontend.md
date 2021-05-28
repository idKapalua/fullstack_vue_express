> Vue (front-end)
> 
* .gitignore
  * node_modules
  * /client

* vue/cli
  * ```npm i -g @vue/cli```

* vue project
  * create folder ./client
  * ``` vue create client```
    * select Default ( [Vue 2] babel, eslint)
    * cd client
    * npm run serve
  * http://localhost:8080 (ok)

* Update files
  * *Helloworld.vue*
    * ./client/src/component/HelloWorld.vue
    * *Helloworld.vue* to *PostComponent.vue*
  * App.vue
    * replace all *HelloWorld* to *PostComponent*
    * (*vim*) :%s/HelloWorld/Postcomponent/gc

* axios
  * Create a service handle making all of request
    * stop front-end server
    * ```npm i axios```
    * restart front-end command by ```npm run serve```

* Create PostService.js
  * Handle all of HTTP request

  ```js
  // file : ./client/src/PostService.js
  import axios from 'axios';

  const url = "http://localhost:5000/api/posts/";

  class PostService {
    //get post
    static getPost() {
      return new Promise( async(resolve, reject) => {
        try {
          const res = await axios.get(url);
          const data = res.data;
          resolve(

            data.map( post => ({
              ...post,
              createdAt: new Date(post.createdAt)
            }))

          );
        } catch(err) {
          reject(err);
        }
      } );
    }

    //create post
    static insertPost(text) {
      return axios.post(url, {
        text
      });
    }

    //delete post
    static deletePost(id) {
      return axios.delete(`${url}${id}`)
    }

  }

  export default PostService;
  ```

* Update PostCompoment.vue (./client/src/components)
  ```js
    // file : ./client/src/components/PostComponent.vue
  <template>
    <div class="container">
      <h1>Lastest Posts</h1>
      <div class="create-post">
        <label for="create-post">Say Something...</label>
        <input type="text" id="create-post" v-model="text" placeholder="Create a post">
        <button v-on:click="createPost">Post!</button>
      </div>    <!-- CREATE POST HERE -->
      <hr>

      <p class="error" v-if="error">{{error}}</p>
      <div class="post-container">
        <div class="post"
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id" 
          v-on:dblclick="deletePost(post._id)"
        >
          <p class="text"> {{ post }}</p>
          <p class="text"> text : {{ post.text }}</p>

        </div>
      </div>
    </div>
  </template>

  <script>
  import PostService from "../PostService";

  export default {
    name : 'PostComponent',

    data () {
      return {
        posts : [],
        error : '',
        text : ''
      }
    },

    async created() {
      PostService.getPosts().then( res => this.posts = res ).catch(err=>this.error = err);
    },

    methods: {
      async createPost() {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
      },

      async deletePost(id) {
        await PostService.deletePost(id);
        this.posts = await PostService.getPosts();
      }

    }
  }

  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  div.container {
  max-width: 800px;
  margin: 0 auto;
  }

  p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
  }

  div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
  }

  div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
  }

  p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
  }
  </style>
  ```

  
import axios from 'axios';

const url = "api/posts/";

class PostService {
  //get post
  static async getPosts() {
    return axios.get(url).then( res => res.data)
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

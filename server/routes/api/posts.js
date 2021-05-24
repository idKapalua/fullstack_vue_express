const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get posts
router.get('/', async (req,res) => {
  const post = await loadPostCollection();
  res.send(await post.find({}).toArray());
});


// Add post
router.post('/', async(req, res) => {
  const post = await loadPostCollection();
  post.insertOne({
    text : req.body.text,
    createdAt : new Date()
  });

  res.status(201).send();

});


// delete post
router.delete('/:id', async (req,res) => {
  const post = await loadPostCollection();
  await post.deleteOne({_id: new mongodb.ObjectID(req.params.id)});

  res.status(200).send();
});


// Get mongoDB Collection
async function loadPostCollection()
{
  const client = await mongodb.MongoClient.connect
  ('mongodb://127.0.0.1:27017',{
    useNewUrlParser:true});
  
    return client.db('vue_express').collection('posts');
}


module.exports = router;
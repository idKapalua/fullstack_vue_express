const express = require('express'); // bring express
const mongodb = require('mongodb'); // bring mongodb driver

const router = express.Router();


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

async function loadPostCollection()
{
    const client = await mongodb.MongoClient.connect
    ('mongodb://127.0.0.1:27017', {
        useNewUrlParser:true
    });
    
    return client.db('vue_express').collection('posts');
}

module.exports = router;
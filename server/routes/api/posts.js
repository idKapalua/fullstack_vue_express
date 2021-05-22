const express = require('express'); // bring express
const mongodb = require('mongodb'); // bring mongodb driver

const router = express.Router();


// Get post
// Slash('/') actually mean localhost:5000/api/posts/
router.get('/', (req,res) => {
    res.send('hello');
});

// Add post

// delete post


module.exports = router;
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req,res) => {
    const projectlist = await loadProjectlistCollection();
    res.send(await projectlist.find({}).toArray());
});

router.post('/', async (req,res) => {
    const projectlist = await loadProjectlistCollection();
    await projectlist.insertOne({
        text : req.body.text,
        CreatedAt : new Date()
    });
    res.status(200).send();
});

router.post('/:id', async (req, res) => {
    const projectlist = await loadProjectlistCollection();
    await projectlist.deleteOne({
        _id : new mongodb.ObjectID(req.params.id)
    });

    res.status(201).send();

});


async function loadProjectlistCollection()
{
    const client = await mongodb.MongoClient.connect
    ('mongodb://127.0.0.1:27017', {
        useNewUrlParser:true
    });

    return client.db('vue_express').collection('projectlist');
};

module.exports = router;
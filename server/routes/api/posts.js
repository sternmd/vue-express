const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray()); // all posts
});

// add post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// delete post

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://abc123:abc123@ds157857.mlab.com:57857/vue-express-app',
    { useNewUrlParser: true }
  );

  return client.db('vue-express-app').collection('posts');
}

module.exports = router;

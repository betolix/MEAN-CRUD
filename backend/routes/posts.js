const express = require('express');


const PostController = require('../controllers/posts');

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post(
  '',
  checkAuth, // WEEEE MY FIRST MIDDLEWARE !!!
  extractFile, // WEEEE MY SECOND MIDDLEWARE !!!
  PostController.createPost 
  );
  
  // UPDATE
  router.put('/:id', 
  checkAuth, // WEEEE MY FIRST MIDDLEWARE !!! 
  extractFile, // WEEEE MY SECOND MIDDLEWARE !!!
  PostController.updatePost 
  );
  
  router.get('', 
  PostController.getPosts
   );
  
  router.get('/:id', 
  PostController.getPost
  );
  
  router.delete('/:id', 
  checkAuth, // WEEEE MY FIRST MIDDLEWARE !!!
  PostController.deletePost
  );
  

  module.exports = router;
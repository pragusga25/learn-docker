const express = require('express');
const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route('/:id')
  .get(postController.getPostById)
  .patch(protect, postController.updatePostById)
  .delete(protect, postController.deletePostById);

module.exports = router;

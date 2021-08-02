import { Router } from 'express'
import PostController from '../controllers/PostController'
import PostMiddleware from '../middlewares/PostMiddleware'

const router = Router()

router.get('/', PostController.getAllPosts)
router.get('/:id', PostMiddleware.validateParams, PostController.showPost)
router.post('/', PostMiddleware.addPost, PostController.addPost)
router.put('/:id', PostMiddleware.editPost, PostController.editPost)
router.delete('/:id', PostMiddleware.validateParams, PostController.deletePost)

router.post('/:id/rate', PostMiddleware.addRating, PostController.addRating)
router.get('/:id/rate', PostMiddleware.validateParams, PostController.getRating)

export default router

import 'express-async-errors'
import PostService from '../services/PostService'
import Util from '../utils/Utils'

const util = new Util()

class PostController {
  static async getAllPosts(req, res) {
    const allPosts = await PostService.getAllPosts()

    util.setSuccess(200, 'Posts retrieved', allPosts)
    util.send(res)
  }

  static async addPost(req, res) {
    const newPost = await PostService.addPost(req.body)

    util.setSuccess(201, 'Post created', newPost)
    util.send(res)
  }

  static async editPost(req, res) {
    const { id } = req.params
    const post = await PostService.editPost(id, req.body)

    if (post == undefined)
      util.setError(404, `Cannot find post with the id ${id}`)
    else util.setSuccess(200, 'Post updated', post)

    util.send(res)
  }

  static async showPost(req, res) {
    const { id } = req.params
    const post = await PostService.getPost(id)

    if (post == undefined)
      util.setError(404, `Cannot find post with the id ${id}`)
    else util.setSuccess(200, 'Post retrieved', post)

    util.send(res)
  }

  static async deletePost(req, res) {
    const { id } = req.params
    const post = await PostService.deletePost(id)

    if (post == undefined)
      util.setError(404, `Cannot find post with the id ${id}`)
    else util.setSuccess(200, 'Posts deleted', {})

    util.send(res)
  }

  static async addRating(req, res) {
    const { id } = req.params
    const post = await PostService.ratePost(id, req.body.rating)

    if (post == undefined)
      util.setError(404, `Cannot find post with the id ${id}`)
    else util.setSuccess(200, 'Rating added to post', post)

    util.send(res)
  }

  static async getRating(req, res) {
    const { id } = req.params
    const post = await PostService.getAvgPostRating(id)

    if (post == undefined)
      util.setError(404, `Cannot find post with the id ${id}`)
    else util.setSuccess(200, 'Post rating retrieved', post)

    util.send(res)
  }
}

export default PostController

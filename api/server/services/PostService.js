// import 'express-async-errors'
import DB from "../models";

class PostService {
  static async ratePost(id, postRating) {
    const postToRate = await DB.Post.findByPk(id);

    if (postToRate) {
      const new_total_ratings = postToRate.number_of_ratings + 1;
      const previous_weigh = postToRate.average_rating * postToRate.number_of_ratings
      const new_average_rating = (previous_weigh + postRating) / new_total_ratings;

      return await postToRate.update({
        average_rating: new_average_rating,
        number_of_ratings: new_total_ratings,
      });
    }

    return undefined;
  }

  static async getAllPosts() {
    return await DB.Post.findAll();
  }

  static async getPost(id) {
    const post = await DB.Post.findByPk(id);
    return post ? post : undefined;
  }

  static async addPost(newPost) {
    return await DB.Post.create(newPost);
  }

  static async editPost(id, editPost) {
    const postToEdit = await DB.Post.findByPk(id);
    return postToEdit ? await postToEdit.update({ ...editPost }) : undefined;
  }

  static async getAvgPostRating(id) {
    const post = await DB.Post.findByPk(id);
    return post ? post.average_rating : undefined;
  }

  static async deletePost(id) {
    const postToDelete = await DB.Post.findByPk(id);
    return postToDelete ? await postToDelete.destroy() : undefined;
  }
}

export default PostService;

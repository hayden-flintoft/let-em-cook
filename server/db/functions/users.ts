import { CommentData } from 'models/comments'
import connection from '../connection'
// import { User } from '../../../models/users'
// import { P } from 'vitest/dist/reporters-yx5ZTtEV.js'

const db = connection

// user comments
export function getCommentByRecipeId(id: number) {
  return db('user_comments')
    .where('recipe_id', id)
    .select('id', 'username', 'recipe_id', 'comment')
}

// user comments
export function addCommentByRecipeId(addComment: CommentData) {
  return db('user_comments').insert({
    clerk_id: addComment.clerkId,
    username: addComment.username,
    recipe_id: addComment.recipeId,
    comment: addComment.comment,
  })
}

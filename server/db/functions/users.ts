import { CommentData } from 'models/comments'
import connection from '../connection'
// import { User } from '../../../models/users'
// import { P } from 'vitest/dist/reporters-yx5ZTtEV.js'
import { LikeData } from 'models/likes'

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

export function getLikesById(id: number) {
  return db('user_likes')
    .where('recipe_id', id)
    .count({count: '*'})
    .select('id', 'recipe_id as recipeId')
}

export function addLikes(addLike: LikeData) {
  return db('user_likes').insert({
    clerk_id: addLike.clerkId,
    recipe_id: addLike.recipeId,
    is_clicked: addLike.isClicked
  })
}

export function countLikes(id: number) {
  return db('user_likes').where('recipe_id', id).count({count: '*'})
}

export function getLikeByClerkId (clerkId: string) {
  return db('user_likes').where('clerk_id', clerkId).select('id', 'recipe_id as recipeId')
}



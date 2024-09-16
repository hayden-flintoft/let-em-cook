export interface CommentData {
    clerkId: string | undefined;
    username: string | null | undefined;
    recipeId: number;
    comment: string;
}

export interface Comment extends CommentData {
  id: number
}

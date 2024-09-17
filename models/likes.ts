export interface LikeData {
  clerkId: string | undefined;
  username: string | null | undefined;
  recipeId: number;
  isClicked: boolean;
}

export interface Like extends LikeData {
id: number
}

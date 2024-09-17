import  { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

export default function Like( {recipeId} ) {
  const {user} = useUser()
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    if (recipeId) {
      fetchLikeStatus(recipeId);
    }
  }, [recipeId]);

  const fetchLikeStatus = async (recipeId) => {
    try {
      const response = await fetch(`/api/v1/likes/recipes/${recipeId}`);
      console.log(response)
      const data = await response.json();
      console.log(data)
      setLiked(data.isLiked);
      setLikeCount(data.count);
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };

  const handleToggleLike = async () => {
    try {
      const response = await fetch(`/api/v1/likes/recipes/${recipeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isClicked: !liked, clerkId: user?.id, recipeId }),
      });
      const data = await response.json()
      console.log(data)
      setLiked(!liked);
      setLikeCount(data.count);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute right-4 top-4 flex items-center">
      <button
        onClick={handleToggleLike}
        disabled={isLoading}
        className={`rounded-full p-2 ${
          liked ? 'text-red-500' : 'text-[#9E3700]'
        } transition-colors hover:text-red-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Heart className="h-10 w-10" fill={liked ? 'currentColor' : 'none'} />
      </button>
      <span className=" text-2xl font-extrabold text-[#9E3700]">{likeCount}</span>
    </div>
  );
}
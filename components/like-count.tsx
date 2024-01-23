"use client"
import { useEffect, useState } from "react"
import { Heart } from 'lucide-react'
import { Database } from "@/types/supabase";
import { CheckIfUserLiked, LikePost, DeleteLike } from "@/utils/supabase-server";
import { Session } from "@supabase/supabase-js";
type Like = Database['public']['Tables']['likes']['Row']
type Post = Database['public']['Tables']['posts']['Row']
import { cn } from "@/lib/utils"

interface LikeProps {
  likes: Like[]
  reader: Session;
  post: Post
}


export default function LikeCount(props: LikeProps){
  const [numLikes, setNumLikes] = useState<number>(props.likes.length);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const determineButtonState = async() => {
      const data = await CheckIfUserLiked(props.post.id, props.reader.user.id)
      setIsActive(data!)
    }
    determineButtonState()
    
  }, [])

  
  const handleLike = async() => {
    if(!isActive) { 
      setNumLikes(numLikes! + 1)
      LikePost(props.post.id, props.reader.user)
    }
    else { 
      setNumLikes(numLikes - 1)
      DeleteLike(props.post.id, props.reader.user.id)
    }
    setIsActive(!isActive)
    
  }

  return (
    <>
    <div 
      onClick={() => handleLike()}
      className={cn(isActive ? 'bg-red-100' : 'bg-transparent' ,'flex gap-2 hover:bg-red-100 rounded-full p-2')}
      
    >
      
      <Heart className={cn(isActive ? 'fill-red-500 stroke-red-500' : 'bg-transparent' ,' h-6 w-6 hover:fill-red-500 hover:stroke-red-500')}/>
      <p> {numLikes! > 0 ? numLikes : ''} </p> 
    </div>
    </>
  )
}
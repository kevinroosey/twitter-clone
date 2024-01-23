import type { Database } from '@/types/supabase'
import { Heart, MessageSquare, Repeat2 } from 'lucide-react'
import { cookies } from 'next/headers'
import { Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import LikeCount from './like-count'
type Post = Database['public']['Tables']['posts']['Row']


export default async function TimelineAnalytics({post, session} : {post: Post, session:Session}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data : likes} = await supabase
    .from('likes')
    .select("*")
    .eq('post_liked', post.id)

  const { data: reposts } = await supabase
    .from('likes')
    .select("*")
    .eq('post_liked', post.id)

  const { data: comments } = await supabase
   .from('likes')
    .select("*")
    .eq('post_liked', post.id)


  return (
  
    <div className='w-full flex flex-row'>
      <div className='w-1/3 flex flex-row'>
        
        <MessageSquare className='text-slate-900 stroke-1 h-6 w-6'/>
        {comments?.length! > 0 ? comments?.length : ''}
      </div>
      <div className='w-1/3 flex flex-row'>
        
        <Repeat2 className='text-slate-900 stroke-1 h-6 w-6'/>
        {reposts?.length! > 0 ? reposts?.length : ''}
      </div>
      <div className='w-1/3 flex flex-row'>
        <LikeCount post={post} likes={likes!} reader={session}/>
        
      </div>
    </div>
  
  )
}
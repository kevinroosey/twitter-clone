import type { Database } from '@/types/supabase'
import { Avatar,AvatarFallback, AvatarImage } from '../ui/avatar'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Balancer from 'react-wrap-balancer'
import TimelineAnalytics from './timeline-analytics'
type Post = Database['public']['Tables']['posts']['Row']


function getFormattedDate(date:Date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  let day = date.getDate().toString();

  return month + '/' + day + '/' + year;
}

export default async function Post(post: {post: Post}) {
  
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user', post.post?.author!)
    .single()

  const date = getFormattedDate(new Date(post.post.created_at))
  
  return (
    <div className="w-full border-1 my-4 border-b-1 border-slate-100">
      <div className="w-full flex flex-row">
        <div className="items-center">
          <Avatar>
            <AvatarImage className="" src="https://github.com/kevinroosey.png" />
            <AvatarFallback>KR</AvatarFallback>
          </Avatar>
        </div>
        <div className='w-full flex flex-col'>
          <div className="w-full flex flex-row gap-1 mx-4">
            <div className='w-full'>
              <p className='text-md text-black font-bold'>{profile?.display_name}</p>
              <p className='text-md text-slate-600'>@{profile?.username}</p>
            </div>
            <div className='mx-4'>
                <p className='text-sm text-slate-600'><Balancer>{date}</Balancer></p>
            </div>
            
          </div>
          <div className='mx-4 my-4'>
            <p className='text-xl'><Balancer>{post.post.content}</Balancer></p>
          </div>
          <div className='mx-4 mt-4'>
            <TimelineAnalytics post={post.post}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}
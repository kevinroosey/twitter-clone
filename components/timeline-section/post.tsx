import type { Database } from '@/types/supabase'
import { createServerSupabaseClient, getPostAuthor } from '@/utils/supabase-server'

import Balancer from 'react-wrap-balancer'
import TimelineAnalytics from './timeline-analytics'
import Image from 'next/image'

type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']



interface TimelineItem {
  author: string | null;
  content: string | null;
  created_at: string;
  id: number;
  post_id: number | null;
  reposter_id: number | null;
  commenter_id: number | null;
}

export type TimelinePosts = {
  post_object: TimelineItem
  author: Profile;
  profile_picture: string;
}

function getFormattedDate(date:Date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  let day = date.getDate().toString();

  return month + '/' + day + '/' + year;
}




export default async function Post({post}: {post: Post}) {
 
  const supabase = createServerSupabaseClient();
  const author = await getPostAuthor(post.author!)
  const date = getFormattedDate(new Date(post.created_at))
  const publicUrl = await supabase.storage.from('avatars').getPublicUrl(`${author?.user}.jpg`)

  
  return (
    <div className="w-full border-1 my-4 border-b-1 border-slate-100">
      <div className="w-full flex flex-row">
        <div className="post-center w-1/6">
          <Image className="w-12 h-12 rounded-full" width={100} height={100} alt="pfp" src={publicUrl.data.publicUrl} />
        </div>
        <div className='w-full flex flex-col'>
          <div className="w-full flex flex-row gap-1 mx-4">
            <div className='w-full'>
              <p className='text-md text-black font-bold'>{author?.display_name}</p>
              <p className='text-md text-slate-600'>@{author?.username}</p>
            </div>
            <div className='mx-4'>
                <p className='text-sm text-slate-600'><Balancer>{date}</Balancer></p>
            </div>
            
          </div>
          <div className='mx-4 my-4'>
            <p className='text-xl'><Balancer>{post.content}</Balancer></p>
          </div>
          <div className='mx-4 mt-4'>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}
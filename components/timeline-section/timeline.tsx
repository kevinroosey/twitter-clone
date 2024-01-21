import { User, createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Post from './post'

export const revalidate = 0;

type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

interface TimelineItems {
  author: string | null;
  content: string | null;
  created_at: string;
  id: number;
  post_id: number | null;
  reposter_id: number | null;
  commenter_id: number | null;
}

export type TimelinePosts = {
  post_object: TimelineItems
  author: Profile;
  profile_picture: string;
}


export default async function Timeline({posts}: {posts: Post[]}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  
  
  
  return (
    <div>
      {posts?.map((post: Post) => (
        <div className='border-b'>
          <Post post={post}/>
        </div>
      ))}
    </div>
  )
}
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Post from './post'


type Post = Database['public']['Tables']['posts']['Row']
export default async function Timeline() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data: posts } = await supabase.from('posts').select('*')
  
  return (
    <div>
      {posts?.map((item: Post) => (
        <div className='border-b'>
          <Post post={item}/>
        </div>
      ))}
    </div>
  )
}
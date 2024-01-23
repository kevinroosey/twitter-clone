

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { getSession, publishPost } from "@/utils/supabase-server";
import type { Database } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import PostEditor from "./post-writer";
type Post = Database['public']['Tables']['posts']['Row']


export default async function CreatePost(user: {user: User}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const publicUrl = await supabase.storage.from('avatars').getPublicUrl(`${user.user.id}.jpg`)
  

  return (
    <div className="w-full border-slate-200 border-1">
      <PostEditor user={user.user} avatar={publicUrl.data.publicUrl}/>
    </div>
  )
}
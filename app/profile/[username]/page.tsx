import React from "react";
import { Sidebar } from "@/components/sidebar"
import CreateTweet from "@/components/timeline-section/write-post"
import Timeline from "@/components/timeline-section/timeline"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileTimeline from "@/components/timeline-section/profile-timeline";
import { fetchCommentByUser, fetchLikeByUser, fetchPostByUser, fetchRepostByUser, fetchUserActivity } from "@/utils/supabase-server";

export default async function Page({ params }: { params: { username: string } }){
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) { redirect("/login"); }

  const profile = await supabase.from('profiles').select("*").eq('username', params.username).single()
  const publicUrl = await supabase.storage.from('avatars').getPublicUrl(`${profile.data?.user}.jpg`)

  const timelineData = await fetchUserActivity(session.user)
  
  
  return (
    <div className="w-full grid grid-cols-3">
      <div className="w-full flex">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <Sidebar />
        </div>
      </div>
      <div className="w-full border-x border-slate-100  my-0">
        <div className="flex flex-row items-stretch p-4  gap-8">
          <div className="">
            <Image src={publicUrl.data.publicUrl} width={100} height={100} alt="pfp" className="rounded-full w-full"/>
          </div>
          <div className="w-full flex">
            <div className="w-full flex flex-col gap-3">
              <div className="w-full relative">
                <div className="absolute left-0">
                  <p className="font-semibold text-xl">{profile.data?.display_name}</p>
                  <p className="text-md text-slate-700">@{profile?.data?.username}</p>
                  <div>
                    <p className="text-lg">{profile.data?.bio}</p>
                  </div>
                </div>
                <div className="absolute right-0">
                  {session.user.id === profile.data?.user ? (
                    <Link href={'/settings'}>
                      <Button variant={"ghost"} className="rounded-none">
                        Edit Profile
                      </Button>
                    </Link>
                  ): (
                    <Link href={'/settings'}>
                      <Button variant={"ghost"} className="rounded-none">
                        Follow
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          
        
        </div>
        <ProfileTimeline 
          posts={timelineData.posts!} 
          reposts={timelineData.reposts!} 
          likes={timelineData.likes!} 
          comments={timelineData.comments!}
          profile={profile.data!}
        />

        
      </div>
    </div>
  )
}
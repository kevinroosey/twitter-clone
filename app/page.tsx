import { SupabaseClient } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import CreateTweet from "@/components/timeline-section/write-post";
import Timeline from "@/components/timeline-section/timeline";
import { fetchProfile } from "@/utils/supabase-server";
import { fetchPost } from "@/utils/supabase-server";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) { redirect("/login"); }

  const profile = await fetchProfile(session.user.id)
  if(profile?.length == 0) { redirect('/settings'); }

  //fetch timeline posts and sort in chronological order
  const posts = await fetchPost()
  
  return (
    <div className="w-full grid grid-cols-3">
      <div className="w-full flex">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <Sidebar />
        </div>
      </div>
      <div className="w-full border-x border-slate-100  my-0 h-max">
      <div className="mt-4 mx-4 border-b border-slate-100 border-1">
         <CreateTweet user={session.user}/>
        </div>
        <div className="mx-4 border-slate-100 border-1">
          <Timeline posts={posts!}/>
        </div>
        
      </div>
      
    </div>
  );
}

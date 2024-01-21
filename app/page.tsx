import { SupabaseClient } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import CreateTweet from "@/components/timeline-section/write-post";
import Timeline from "@/components/timeline-section/timeline";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full grid grid-cols-3">
      <div className="w-full flex">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <Sidebar />
        </div>
      </div>
      <div className="w-full border-x border-slate-100  my-0">
        <div className="mt-4 mx-4 border-b border-slate-100 border-1">
         <CreateTweet />
        </div>
        <div className="mx-4 border-slate-100 border-1">
          <Timeline />
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

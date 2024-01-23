"use server"
import { Database } from "@/types/supabase";
import { User, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Like = Database['public']['Tables']['likes']['Row']
type Repost = Database['public']['Tables']['reposts']['Row']
type Comment = Database['public']['Tables']['comments']['Row']



export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function publishPost(post: Post) {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('posts').insert(post)
    console.log(error)
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchProfile(user: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('profiles').select("*").eq('user', user)
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function upsertProfile(profile: Profile) {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('profiles').upsert(profile)
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}



export async function LikePost(post_id:number, user:User){
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase
      .from('likes')
      .insert({
        user: user.id, 
        created_at: ((new Date()).toISOString()),
        post_liked: post_id,
        id:(Math.floor(Math.random() * 10000000) + 1)
      })
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function CheckIfUserLiked(post_id: number, user_id: string):Promise<boolean | null>{
  const supabase = createServerSupabaseClient();
  try {
    const { data, error} = await supabase
      .from('likes')
      .select('*')
      .eq('post_liked', post_id)
      .eq('user', user_id)

    return data!.length != 0;
  } catch(error) {
    console.error("Error:", error);
    return null;
  }
}

export async function DeleteLike(post_id: number, user_id: string){
  const supabase = createServerSupabaseClient();
  console.log(user_id)
  try {
    const { data, error} = await supabase
      .from('likes')
      .delete()
      .eq('post_liked', post_id)
      .eq('user', user_id)
    console.log(error)
    return data;
  } catch(error) {
    console.error("Error:", error);
    return null;
  }
}



export async function fetchPost():Promise<Post[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('posts').select("*").order('created_at', {ascending: false})
    
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}




export async function getPostAuthor(author: string): Promise<Profile | null>{
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('profiles').select("*").eq('user', author).single()
    
    return data!;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchPostByUser(user: User):Promise<Post[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('posts').select("*").eq('author', user.id)
    console.log(error)
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchRepostByUser(user: User): Promise<Repost[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('reposts').select("*").eq('reposter_id', user.id)
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchCommentByUser(user: User): Promise<Comment[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('comments').select("*").eq('commenter_id', user.id)
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchLikeByUser(user: User): Promise<Like[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('likes').select("*").eq('user', user.id)
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

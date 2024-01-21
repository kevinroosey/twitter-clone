"use server"
import Post from "@/components/timeline-section/post";
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

export async function fetchProfilePicture(id: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.storage.from('avatars').download(`${id}.png`)
    return data;
  }catch (error) {
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

export async function fetchRepost(user: User): Promise<Repost[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('reposts').select("*")
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchComment(user: User): Promise<Comment[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('comments').select("*")
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchLike(user: User): Promise<Like[] | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from('likes').select("*")
    return data;
  }catch (error) {
    console.error("Error:", error);
    return null;
  }
}

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





type UserActivity = Post | Repost | Comment | Like

export async function fetchUserActivity(user: User){

  const data:UserActivity[] = [];

  const posts = await fetchPostByUser(user);
  const reposts = await fetchRepostByUser(user);
  const comments = await fetchCommentByUser(user)
  const likes = await fetchLikeByUser(user);

  return {posts, reposts, comments, likes}
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

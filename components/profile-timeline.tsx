"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Database } from "@/types/supabase";
import Post from "./post";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Repost = Database["public"]["Tables"]["reposts"]["Row"];
type Comment = Database["public"]["Tables"]["comments"]["Row"];
type Like = Database["public"]["Tables"]["likes"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type UserActivity = {
  posts: Post[];
  reposts: Repost[];
  comments: Comment[];
  likes: Like[];
};

type PostWithUserData = {
  post: Post;
  author: Profile;
  profile_picture: string;
};

type timelineStates = "posts" | "reposts" | "comments" | "likes";

export default function ProfileTimeline({
  posts,
  reposts,
  comments,
  likes,
  profile,
}: {
  posts: Post[];
  reposts: Repost[];
  comments: Comment[];
  likes: Like[];
  profile: Profile;
}) {
  const [postActive, setPostActive] = useState<boolean>(true);
  const [repostActive, setRepostActive] = useState<boolean>(false);
  const [commentsActive, setCommentsActive] = useState<boolean>(false);
  const [likesActive, setLikesActive] = useState<boolean>(false);

  return (
    <div>
      <div className="grid grid-cols-4 border-y border-slate-100 border-1">
        <div className="w-full">
          <Button
            className="w-full rounded-none"
            variant={"secondary"}
            onClick={() => {
              setPostActive(!postActive);
            }}
          >
            posts
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full rounded-none "
            variant={"ghost"}
            onClick={() => setRepostActive(!repostActive)}
          >
            reposts
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full rounded-none "
            variant={"ghost"}
            onClick={() => setCommentsActive(!comments)}
          >
            comments
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full rounded-none "
            variant={"ghost"}
            onClick={() => setLikesActive(!likes)}
          >
            likes
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

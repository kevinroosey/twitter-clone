"use client";
import { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { User } from "@supabase/supabase-js";
import { publishPost } from "@/utils/supabase-server";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";

type PostEditorProps = {
  user: User;
  avatar: string;
};

export default function PostEditor(user: PostEditorProps) {
  const [post, setPost] = useState<string | null>("");

  const handleSubmit = async () => {
    const published = await publishPost({
      author: user.user.id,
      content: post!,
      id: Math.floor(Math.random() * 10000000) + 1,
      created_at: new Date().toISOString(),
    });
    setPost("");
  };

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="items-center w-1/6">
          <Image
            className="w-12 h-12 rounded-full"
            width={100}
            height={100}
            alt="pfp"
            src={user.avatar}
          />
        </div>
        <div className="w-full">
          <Textarea
            className="resize-none w-full text-lg border-0 focus:ring-0 focus:!ring-[#ffffff]"
            placeholder="What's on your mind?"
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
      </div>
      {post?.length! > 0 && (
        <div className="flex w-full justify-end mb-0">
          <Button className="" onClick={() => handleSubmit()}>
            Send Post
          </Button>
        </div>
      )}
    </>
  );
}

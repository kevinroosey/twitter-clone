"use client"
import { AvatarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useState } from "react";
export default function CreateTweet() {
  const [createMode, setCreateMode] = useState<boolean>(false);
  return (
    <div className="w-full border-slate-200 border-1">
      <div className="w-full flex flex-row">
        <div className="w-1/12">
          <Avatar>
            <AvatarImage src="https://github.com/kevinroosey.png" />
            <AvatarFallback>KR</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          
          <Textarea
            
            className="resize-none w-full text-lg border-0 focus:ring-0 focus:!ring-[#ffffff]"
            placeholder="What's on your mind?"
            onClick={() => setCreateMode(true)}
          />
        </div>
      
      </div>
      { createMode && (
        <div className="flex w-full justify-end mb-0">
          <Button className="">
            Send Post
          </Button>
        </div>
      )}
    </div>
  )
}
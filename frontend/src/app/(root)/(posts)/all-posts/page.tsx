"use client";

import React, { Suspense } from "react";
import { useMe } from "@/hooks/useMe";
import { usePosts } from "@/hooks/usePosts";
import PostDisplay from "@/components/PostDisplay/PostDisplay";

export default function WritePostPage() {
  const {posts, meta} = usePosts();
  console.debug("posts", posts);
  return <div className="">
    {posts.map(post=><PostDisplay post={post}/>)}
  </div>;
}

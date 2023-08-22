"use client";

import React, { Suspense } from "react";
import { useMe } from "@/hooks/useMe";
import { usePosts } from "@/hooks/usePosts";
import PostDisplay from "@/components/PostDisplay/PostDisplay";

export default function WritePostPage() {
  const { fetchPosts } = usePosts();
  const posts = fetchPosts.data;
  return (
    <div className="flex flex-col gap-5">
      {posts?.length && posts.map((post) => (
        <PostDisplay post={post} />
      ))}
    </div>
  );
}

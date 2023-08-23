"use client";

import React, { Suspense } from "react";
import { useMe } from "@/hooks/useMe";
import { usePosts } from "@/hooks/usePosts";
import PostDisplay from "@/components/PostDisplay/PostDisplay";
import NoPosts from "@/components/NoPosts/NoPosts";

export default function AllPostsPage() {
  const { fetchPosts } = usePosts();
  const posts = fetchPosts.data;
  return (
    <div className="flex flex-col gap-5">
      {posts?.length ? (
        posts.map((post) => <PostDisplay post={post} key={post.id} />)
      ) : (
        <div className="">
          <NoPosts />
        </div>
      )}
    </div>
  );
}

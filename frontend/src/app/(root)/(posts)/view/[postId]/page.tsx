"use client";

import Loader from "@/components/Loader/Loader";
import PostDisplay from "@/components/PostDisplay/PostDisplay";
import { usePosts } from "@/hooks/usePosts";

export default function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { fetchPost } = usePosts();
  const post = fetchPost(params.postId)?.data;
  return (
    <div className="flex justify-center">
      {post.id ? (
        <PostDisplay post={post} />
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

"use client";

import Loader from "@/components/Loader/Loader";
import PostDisplay from "@/components/PostDisplay/PostDisplay";
import { usePost } from "@/hooks/usePost";

export default function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { post } = usePost(params.postId);
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

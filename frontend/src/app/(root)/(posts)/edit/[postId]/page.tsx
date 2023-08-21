"use client";

import Loader from "@/components/Loader/Loader";
import { usePost } from "@/hooks/usePost";
import EditPostComponent from "./EditPostComponent/EditPostComponent";

export default function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { post } = usePost(params.postId);
  return (
    <div className="flex justify-center">
      {post.id ? (
        <EditPostComponent post={post} />
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

"use client";

import EditPostComponent from "@/components/EditPostComponent/EditPostComponent";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";

export default function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { post, meta } = usePost(params.postId);
  const router = useRouter();
  console.debug("post", post);
  return (
    <div className="flex justify-center">
      {post.id ? (
        <EditPostComponent post={post} />
      ) : (
        <div>
          <Loader />
          {/* <Button onClick={()=>router.refresh()}>Retry ↻</Button> */}
        </div>
      )}
    </div>
  );
}

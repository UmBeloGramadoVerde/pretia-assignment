import { Post } from "@/types/post";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { formatDate, getImageLink } from "@/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EditButton from "@/components/EditButton/EditButton";
import { useMe } from "@/hooks/useMe";

interface PostDisplayProps {
  post: Post;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ post }) => {
  const router = useRouter();
  const { me } = useMe();
  return (
    <Card
      className="cursor-pointer w-full"
      onClick={() => router.push("/view/" + post.id)}
    >
      <CardHeader className="relative m-6 p-0">
        <div>
          <CardTitle className="mb-3" id="titleDisplay">{post.title}</CardTitle>
          <CardDescription>By {post.author?.name}</CardDescription>
        </div>
        {post?.id && me?.id === post.author?.id && (
          <div className="absolute top-0 right-0 !mt-0">
            <EditButton editFn={() => router.push("/edit/" + post.id)} />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="break-words max-h-[100px] overflow-hidden" id="textDisplay">{post.textContent}</div>
        {post.jsonContent && (
          <div className="break-words max-h-[100px] overflow-hidden font-light"  id="jsonDisplay">{post.jsonContent}</div>
        )}
        {post.imageContent?.path && (
          <div className="">
            <Image
              src={getImageLink(post.imageContent.path)}
              alt="post image"
              width={200}
              height={200}
              id="imageDisplay"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-5 text-sm text-muted-foreground">
        <div>Posted on {formatDate(post.createdAt)}</div>
        {post.createdAt !== post.updatedAt && (
          <div>Edited on {formatDate(post.updatedAt)}</div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostDisplay;

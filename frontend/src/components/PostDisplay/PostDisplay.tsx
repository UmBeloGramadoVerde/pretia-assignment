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

interface PostDisplayProps {
  post: Post;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ post }) => {
  const router = useRouter();
  return (
    <Card className="cursor-pointer" onClick={() => router.push("/edit/" + post.id)}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>By {post.author?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="break-words">{post.textContent}</div>
        <div className="break-words">{post.jsonContent}</div>
        <div className="">
          <img src={getImageLink(post.imageContent.path)} alt="post image" width={200} height={200}/>
        </div>
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

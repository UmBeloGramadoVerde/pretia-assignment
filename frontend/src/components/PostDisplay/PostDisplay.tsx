import { PostApi } from "@/types/post";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { formatDate } from "@/utils";

interface PostDisplayProps {
  post: PostApi;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ post }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.author?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{post.content}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>{formatDate(post.createdAt)}</div>
        <div>{formatDate(post.updatedAt)}</div>
      </CardFooter>
    </Card>
  );
};

export default PostDisplay;

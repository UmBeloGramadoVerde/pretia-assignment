import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { useAuth } from "@/hooks/useAuth";

const NoPosts = ({ className }: { className?: string }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <Card className="p-5 flex flex-col items-center">
        <CardHeader className="">
          <CardTitle className="mb-3">No posts to display...</CardTitle>
          <CardDescription>
            {isLoggedIn
              ? "Click below to write a new post"
              : "Click below to log in"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoggedIn ? (
            <Button onClick={() => router.push("/write")} className="w-fit">
              New Post
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")} className="w-fit">
              Login
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NoPosts;

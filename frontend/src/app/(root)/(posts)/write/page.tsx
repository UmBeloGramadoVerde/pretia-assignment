"use client";

import EditPostComponent from "@/components/EditPostComponent/EditPostComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function WritePostPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  return (
    <div className="flex justify-center">
      {isLoggedIn ? (
        <EditPostComponent />
      ) : (
        <Card className="p-5 flex flex-col items-center text-center">
          <CardHeader className="">
            <CardTitle className="mb-3">You must log in to post</CardTitle>
            <CardDescription>Click below to log in</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/login")}
              className="w-fit"
              id="loginWritePageButton"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

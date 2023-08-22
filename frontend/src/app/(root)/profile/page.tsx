"use client";

import Loader from "@/components/Loader/Loader";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useMe } from "@/hooks/useMe";
import { formatDate } from "@/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

export default function ProfilePage() {
  const { me } = useMe();
  console.debug("me", me);
  return (
    <>
      {me ? (
        <div className="flex justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Your profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex gap-3" key={"Name"}>
                <h3 className="text-lg">Name:</h3>
                <span className="opacity-75">{me.name}</span>
              </div>
              <div className="flex gap-3" key={"Username"}>
                <h3 className="text-lg">Username:</h3>
                <span className="opacity-75">{me.username}</span>
              </div>
              <div className="flex gap-3" key={"Email"}>
                <h3 className="text-lg">Email:</h3>
                <span className="opacity-75">{me.email}</span>
              </div>
              <div className="flex gap-3" key={"Created at"}>
                <h3 className="text-lg">Created at:</h3>
                <span className="opacity-75">{formatDate(me.createdAt)}</span>
              </div>
              <div className="flex gap-3" key={"Roles"}>
                <h3 className="text-lg">Roles:</h3>
                <span className="opacity-75">
                  {me.roles.map((role) => (
                    <Badge>{role}</Badge>
                  ))}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <LogoutButton />
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}

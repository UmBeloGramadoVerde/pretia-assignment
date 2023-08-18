"use client";

import { Badge } from "@/components/ui/badge";
import { useMe } from "@/hooks/useMe";
import { formatDate } from "@/utils";
import { Loader } from "lucide-react";

export default function ProfilePage() {
  const { me } = useMe();
  console.debug("me", me);
  return (
    <>
      {me ? (
        <div className="flex flex-col justify-center">
          <h1>Your profile</h1>
          <div className="flex gap-3">
            <h3>Name:</h3>
            <span>{me.name}</span>
          </div>
          <div className="flex gap-3">
            <h3>Username:</h3>
            <span>{me.username}</span>
          </div>
          <div className="flex gap-3">
            <h3>Email:</h3>
            <span>{me.email}</span>
          </div>
          <div className="flex gap-3">
            <h3>Created at:</h3>
            <span>{formatDate(me.createdAt)}</span>
          </div>
          <div className="flex gap-3">
            <h3>Roles:</h3>
            <span>{me.roles.map(role=><Badge>{role}</Badge>)}</span>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

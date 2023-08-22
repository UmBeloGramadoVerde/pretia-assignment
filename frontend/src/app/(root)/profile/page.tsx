"use client";

import Loader from "@/components/Loader/Loader";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import { Badge } from "@/components/ui/badge";
import { useMe } from "@/hooks/useMe";
import { formatDate } from "@/utils";

export default function ProfilePage() {
  const { fetchMe, logout } = useMe();
  const me = fetchMe.data;
  return (
    <>
      {me ? (
        <div className="flex flex-col justify-center">
          <h1>Your profile</h1>
          <div className="flex gap-3" key={"Name"}>
            <h3>Name:</h3>
            <span>{me.name}</span>
          </div>
          <div className="flex gap-3" key={"Username"}>
            <h3>Username:</h3>
            <span>{me.username}</span>
          </div>
          <div className="flex gap-3" key={"Email"}>
            <h3>Email:</h3>
            <span>{me.email}</span>
          </div>
          <div className="flex gap-3" key={"Created at"}>
            <h3>Created at:</h3>
            <span>{formatDate(me.createdAt)}</span>
          </div>
          <div className="flex gap-3" key={"Roles"}>
            <h3>Roles:</h3>
            <span>
              {me.roles.map((role) => (
                <Badge>{role}</Badge>
              ))}
            </span>
          </div>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}

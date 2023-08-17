"use client";

import { useMe } from "@/hooks/useMe";

export default function ProfilePage() {
  const { me } = useMe();
  console.debug("me", me);
  return <div className="flex justify-center"></div>;
}

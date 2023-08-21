import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LogOutIcon } from "lucide-react";
import { useMe } from "@/hooks/useMe";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useMe();
  const router = useRouter();
  const logoutClickHandler = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    logout();
    router.push("/")
  };

  return (
    <Button variant="destructive" className="w-fit flex gap-2" onClick={logoutClickHandler}>
      Logout
      <LogOutIcon size={14} />
    </Button>
  );
};

export default LogoutButton;

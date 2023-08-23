import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const logoutClickHandler = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    logout();
    toast({
      variant: "success",
      description: "Logged out!",
    });
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

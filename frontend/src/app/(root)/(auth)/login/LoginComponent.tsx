"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function LoginComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const { signIn } = useAuth();
  const onSubmit = (values: z.infer<typeof formSchema>) =>
    signIn.mutate(values);
  useEffect(() => {
    if (signIn.isSuccess) {
      toast({
        variant: "success",
        description: "Login successful!",
      });
      router.push("/");
    }
    if (signIn.isError) {
      toast({
        variant: "error",
        description: "Login failed",
      });
    }
  }, [signIn.isSuccess, signIn.isError]);
  return (
    <Card className="max-w-[350px] w-full relative">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} id="usernameInput" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" id="passwordInput" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" id="loginButton">
              Login
            </Button>
            <div className="flex gap-5 items-center justify-around">
              <FormDescription>Don't have an account?</FormDescription>
              <Button
                variant="outline"
                onClick={(ev) => {
                  router.push("/register");
                  ev.stopPropagation();
                  ev.preventDefault();
                }}
                id="registerButton"
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {signIn.isLoading && (
        <div className="w-full h-full bg-background opacity-75 top-0 absolute flex justify-center items-center">
          <Loader className="opacity-100 bg-background" />
        </div>
      )}
    </Card>
  );
}

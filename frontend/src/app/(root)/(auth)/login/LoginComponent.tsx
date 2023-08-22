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
  const { signInMutation: signIn, loadingSignIn: loading, resultSignIn: result } = useAuth();
  const onSubmit = (values: z.infer<typeof formSchema>) => signIn(values);
  useEffect(() => {
    result?.accessToken ? router.push("/") : null;
  }, [result]);
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
                    <Input {...field} />
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
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
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
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {loading && (
        <div className="w-full h-full bg-background opacity-75 top-0 absolute flex justify-center items-center">
          <Loader className="opacity-100 bg-background" />
        </div>
      )}
    </Card>
  );
}

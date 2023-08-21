"use client";

import React from "react";
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
import { useSignIn } from "@/hooks/useSignIn";

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
  const signIn = useSignIn();
  const onSubmit = (values: z.infer<typeof formSchema>) => console.log(signIn(values));
  return (
    <Card className="max-w-[350px] w-full">
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
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
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
                  {/* <FormDescription>
                    This is your private password.
                  </FormDescription> */}
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
    </Card>
  );
}

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
  password: z.string().min(8).max(50),
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

export default function RegisterComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });
  const router = useRouter();
  const { signUp } = useAuth();
  const onSubmit = (values: z.infer<typeof formSchema>) => signUp.mutate(values);
  useEffect(() => {
    if (signUp.isSuccess) {
      toast({
        variant: "success",
        description: "Signup successful!",
      });
      router.push("/login");
    }
    if (signUp.isError) {
      toast({
        variant: "error",
        description: "Signup failed",
      });
    }
  }, [signUp.isSuccess, signUp.isError]);
  return (
    <Card className="max-w-[350px] w-full relative">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Fill out your information below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field}  id="nameInput"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} id="usernameInput"/>
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
                    <Input {...field} type="password" id="passwordInput"/>
                  </FormControl>
                  <FormDescription>At least 8 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} id="emailInput"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" id="registerButton">
              Register
            </Button>
            <div className="flex gap-5 items-center justify-around">
              <FormDescription>Already have an account?</FormDescription>
              <Button
                variant="outline"
                onClick={(ev) => {
                  router.push("/login");
                  ev.stopPropagation();
                  ev.preventDefault();
                }}
                id="loginButton"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {signUp.isLoading && (
        <div className="w-full h-full bg-background opacity-75 top-0 absolute flex justify-center items-center">
          <Loader className="opacity-100 bg-background" />
        </div>
      )}
    </Card>
  );
}

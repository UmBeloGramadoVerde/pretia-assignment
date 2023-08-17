"use client";

const TransactionSummaryTable = React.lazy(
  () => import("@/components/TransactionSummaryTable/TransactionSummaryTable")
);
import { useTransactions } from "@/hooks/useTransactions";
import { useEurRates } from "@/hooks/useEurRates";
import Loader from "@/components/Loader/Loader";
import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "@/hooks/useCreatePost";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function EditPostComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const router = useRouter();
  const createPost = useCreatePost()
  const onSubmit = (values: z.infer<typeof formSchema>) => createPost(values);
  return (
    <Card className="max-w-[90%] w-full">
      <CardHeader>
        <CardTitle>New Post</CardTitle>
        <CardDescription>Fill out your information below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your title goes here." {...field} />
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your content here."
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5 items-center justify-between">
              <Button
                variant="outline"
                onClick={(ev) => {
                  router.back();
                  ev.stopPropagation();
                  ev.preventDefault();
                }}
                className="px-5"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-5">
                Post
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

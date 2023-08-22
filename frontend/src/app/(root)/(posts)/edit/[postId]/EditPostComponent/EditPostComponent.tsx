"use client";
import React, { Suspense, useContext, useState } from "react";
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
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "@/types/post";
import RemoveButton from "../../../../../../components/RemoveButton/RemoveButton";
import { ThemeContext } from "@/contexts/ThemeContextProvider";
import ImageFileDisplay from "@/components/ImageFileDisplay/ImageFileDisplay";
import { usePosts } from "@/hooks/usePosts";

const formSchema = z.object({
  title: z.string(),
  textContent: z.string(),
  jsonContent: z.any(),
  imageContent: z.any(),
});

interface EditPostProps {
  post?: Post;
}

const EditPostComponent: React.FC<EditPostProps> = ({ post }) => {
  console.debug("post", post);
  const { isDarkMode } = useContext(ThemeContext);
  const [image, setImage] = useState(post?.imageContent?.path ?? null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title ?? "",
      textContent: post?.textContent ?? "",
      jsonContent: post?.jsonContent ?? "",
      imageContent: post?.imageContent?.path ?? "",
    },
  });
  const router = useRouter();
  const { createPost, editPost, deletePost } = usePosts();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const result = post
      ? editPost({ post: { ...values, imageContent: image }, id: post.id })
      : createPost({ ...values, imageContent: image });
    console.debug("result", result);
  };

  const handleImageChange = (event: any) => {
    console.debug("event", event);
    console.debug("event.target.files[0]", event.target.files[0]);
    try {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    } catch (error) {
      setImage(null);
    }
  };

  const removeImageFn = () => {
    form.setValue("imageContent", "");
    setImage(null);
  };

  return (
    <Card className="max-w-[90%] w-full">
      <CardHeader className="relative m-6 p-0">
        <div>
          <CardTitle className="mb-3">{`${
            post ? "Edit" : "New"
          } Post`}</CardTitle>
          <CardDescription>{`${
            post ? "Edit" : "Fill"
          } out your information below`}</CardDescription>
        </div>
        {post?.id && (
          <div className="absolute top-0 right-0 !mt-0">
            <RemoveButton removeFn={() => deletePost(post.id)} />
          </div>
        )}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your content here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jsonContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Json Content (Optional)</FormLabel>
                  <FormControl>
                    <CodeEditor
                      data-color-mode={isDarkMode ? "dark" : "light"}
                      language="js"
                      placeholder="Type your JSON content here."
                      padding={15}
                      className="font-[inherent] !bg-transparent rounded-md border border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image (Optional)</FormLabel>
                  <FormControl>
                    {image ? (
                      <ImageFileDisplay
                        image={image}
                        removeImageFn={removeImageFn}
                      />
                    ) : (
                      <Input
                        id="picture"
                        type="file"
                        {...field}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageChange}
                      />
                    )}
                  </FormControl>
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
                {post ? "Confirm" : "Post"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditPostComponent;

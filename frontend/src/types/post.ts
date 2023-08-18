export interface EditPostInput {
  post: CreatePostInput;
  id: number;
}
export interface CreatePostInput {
  title: string;
  content: string;
}
export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
  };
}

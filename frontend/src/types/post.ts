export interface EditPostInput {
  post: CreatePostInput;
  id: number;
}
export interface CreatePostInput {
  title: string;
  textContent: string;
  jsonContent?: any;
  imageContent?: any;
}
export interface Post {
  id: number;
  title: string;
  textContent: string;
  jsonContent: any;
  imageContent: {
    path: string
  };
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
  };
}

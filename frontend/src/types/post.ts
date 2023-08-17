export interface CreatePostInput {
  title: string;
  content: string;
}
export interface PostApi {
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

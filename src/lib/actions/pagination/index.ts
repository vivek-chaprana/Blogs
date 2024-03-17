export interface InfiniteScrollData<T> {
  data: T[];
  metadata: {
    lastCursor: string | null;
    hasNextPage: boolean;
  };
}

export { fetchBlogs } from "./fetchBlogs";

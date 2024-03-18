"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { InfiniteScrollData } from "../actions/pagination";

interface Props<T> {
  initialData: InfiniteScrollData<T>;
  fetchFn: (...args: any) => Promise<InfiniteScrollData<T>>;
  take?: number;
  condition?: any;
}

export default function useInfiniteScroll<T>({
  initialData,
  fetchFn,
  condition,
  take = 5,
}: Props<T>) {
  const [data, setData] = useState<T[]>(initialData.data);
  const [metadata, setMetadata] = useState(initialData.metadata);
  const [ref, inView] = useInView();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function loadMore() {
      if (!inView || !metadata.lastCursor || isFetching) return;
      setIsFetching(true);
      try {
        const newData = await fetchFn({
          take,
          lastCursor: metadata.lastCursor,
          where: condition,
        });

        newData.data.length && setData((prev) => [...prev, ...newData.data]);
        setMetadata(newData.metadata);
      } catch (error) {
        toast.error("Failed to load more blogs");
      } finally {
        setIsFetching(false);
      }
    }
    loadMore();
  }, [inView, metadata.lastCursor, condition, fetchFn, take, isFetching]);

  return { data, ref, hasNextPage: metadata.hasNextPage };
}

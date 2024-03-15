// "use client";
// import { InfiniteScrollData } from "@/lib/actions/pagination";
// import { Prisma } from "@prisma/client";
// import { useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import { useInView } from "react-intersection-observer";

// export default function useInfiniteScroll<T>({
//   initialData,
//   action,
//   condition,
// }: {
//   action: (props: any) => Promise<InfiniteScrollData<T>>;
//   initialData: InfiniteScrollData<T>;
//   condition?: Prisma.BlogPostWhereInput;
// }) {
//   const [ref, inView] = useInView();

//   const [data, setData] = useState<T[]>(initialData.data);
//   const [metadata, setMetadata] = useState(initialData.metadata);
//   const [isLoading, setIsLoading] = useState(false);

//   const loadMoreData = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
//     try {
//       toast.success("Loading more data");
//       const newData = await action({
//         take: 3,
//         lastCursor: metadata.lastCursor,
//         where: condition,
//       });
//       setData((prev) => [...prev, ...newData.data]);
//       setMetadata(newData.metadata);
//     } catch (error) {
//       toast.error("Failed to load more data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const debouncedLoadMoreData = useMemo(() => {
//     let timeoutId: NodeJS.Timeout | null = null;
//     return async () => {
//       if (timeoutId || isLoading) return; // Check if already debouncing or loading
//       timeoutId = setTimeout(async () => {
//         await loadMoreData();
//         timeoutId = null;
//       }, 500); // Adjust debounce delay as needed
//     };
//   }, [isLoading, loadMoreData]);

//   useEffect(() => {
//     if (inView && metadata.hasNextPage && !isLoading) debouncedLoadMoreData();
//   }, [inView, isLoading, debouncedLoadMoreData]);

//   return { ref, data, metadata };
// }

// --- New useInfiniteScroll.ts ---
// import { useInView } from "react-intersection-observer";
// import { useEffect, useState, useCallback } from "react";
// import toast from "react-hot-toast";
// import debounce from "@/lib/utils/debounce";
// import { InfiniteScrollData } from "../actions/pagination";

// interface UseInfiniteScrollOptions<T> {
//   fetchData: (cursor?: string) => Promise<InfiniteScrollData<T>>;
//   initialData?: InfiniteScrollData<T>;
//   take?: number;
//   debounceDelay?: number;
// }

// const useInfiniteScroll = <T>({
//   fetchData,
//   initialData,
//   take = 10,
//   debounceDelay = 200,
// }: UseInfiniteScrollOptions<T>) => {
//   const [data, setData] = useState<T[]>(initialData?.data || []);
//   const [metadata, setMetadata] = useState(initialData?.metadata);
//   const [isLoading, setIsLoading] = useState(false);
//   const [ref, inView] = useInView();

//   const loadMoreData = useCallback(
//     debounce(async () => {
//       if (isLoading || !metadata?.lastCursor) return;
//       setIsLoading(true);
//       try {
//         const newData = await fetchData(metadata?.lastCursor);
//         setData((prevData) => [...prevData, ...newData.data]);
//         setMetadata(newData.metadata);
//       } catch (error) {
//         toast.error("Failed to load more data");
//       } finally {
//         setIsLoading(false);
//       }
//     }, debounceDelay),
//     [debounceDelay, fetchData, isLoading, metadata?.lastCursor]
//   );

//   useEffect(() => {
//     if (inView) {
//       loadMoreData();
//     }
//   }, [inView, loadMoreData]);

//   return { data, metadata, ref };
// };

// export default useInfiniteScroll;

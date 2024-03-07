export default async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (data: T) => JSX.Element;
}) {
  return children(await promise);
}

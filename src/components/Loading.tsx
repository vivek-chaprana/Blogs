import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-10">
      <Spinner color="default" />
    </div>
  );
}

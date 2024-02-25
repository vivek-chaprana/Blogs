import { Spinner, SpinnerProps } from "@nextui-org/react";

export default function Loading(props: SpinnerProps) {
  return (
    <div className="flex items-center justify-center py-10">
      <Spinner color="default" {...props} />
    </div>
  );
}

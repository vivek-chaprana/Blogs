"use client";

type EmptyScreenProps = {
  Icon?: JSX.Element;
  title?: string;
  description?: string;
  Button?: JSX.Element;
};

export default function EmptyScreen(props: EmptyScreenProps) {
  const { Icon, title, description, Button } = props ?? {};
  return (
    <div
      data-testid="empty-screen"
      className="flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20 border-subtle border border-[#2b2b2b]"
    >
      {!!Icon && (
        <div className="bg-[#2b2b2b] flex h-[72px] w-[72px] items-center justify-center rounded-full ">
          {Icon}
        </div>
      )}
      <div className="flex max-w-[420px] flex-col items-center">
        {!!title && (
          <h2 className="font-semibold text-[#d6d6d6] font-sans text-center text-xl mt-6 ">
            {title}
          </h2>
        )}
        {!!description && (
          <div className="text-[#d6d6d6] mb-8 mt-3 text-center text-sm font-normal leading-6">
            {description}
          </div>
        )}
        {!!Button && Button}
      </div>
    </div>
  );
}

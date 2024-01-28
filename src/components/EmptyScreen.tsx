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
      className="flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20 border-subtle border border-dark-400"
    >
      {!!Icon && (
        <div className="bg-dark-400 flex h-[72px] w-[72px] items-center justify-center rounded-full ">
          {Icon}
        </div>
      )}
      <div className="flex max-w-[420px] flex-col items-center">
        {!!title && (
          <h2 className="font-semibold text-gt font-sans text-center text-xl mt-6 ">
            {title}
          </h2>
        )}
        {!!description && (
          <div className="text-gt mb-8 mt-3 text-center text-sm font-normal leading-6">
            {description}
          </div>
        )}
        {!!Button && Button}
      </div>
    </div>
  );
}

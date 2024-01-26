const DividerWithText = ({ text }: { text: string }) => (
  <div className="inline-flex items-center justify-center w-full ">
    <hr className="w-full h-px bg-default border-0 dark:bg-gray-700 " />
    <span className="absolute px-3 text-xs  text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
      {text}
    </span>
  </div>
);

export default DividerWithText;

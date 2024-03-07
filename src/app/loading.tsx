import { COMPANY_NAME } from "@/lib/constants";

export default function Loading() {
  const customStyles = {
    strokeDasharray: 17,
    strokeWidth: 1,
  };

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50  border-gray-100 ">
      <svg
        fill="transparent"
        width={100}
        height={100}
        viewBox="-3 -4 39 39"
        className="mx-auto"
      >
        <path
          className="animate-dash"
          stroke="#222"
          d="m16 0 16 32H0z"
          style={customStyles}
        />
      </svg>
      <p className="font-semibold font-brand text-2xl text-center text-black ">
        {COMPANY_NAME}
      </p>
    </main>
  );
}

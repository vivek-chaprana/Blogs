import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
      <span className="bg-gray-200 rounded-full p-3 xs:p-5">
        <MdOutlineSignalWifiStatusbarConnectedNoInternet4 className="text-4xl xs:text-6xl TEXT-GRAY-900" />
      </span>
      <h1 className="text-4xl xs:text-5xl sm:text-6xl font-medium font-serif uppercase tracking-widest text-gray-900 my-3">
        Offline
      </h1>
      <p className="text-lg xs:text-xl text-gray-500">
        You are offline. Please check your internet connection.
      </p>
    </main>
  );
}

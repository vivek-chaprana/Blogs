import Loading from "@/components/Loading";
import UserCard from "@/components/UserCard";

export default function Following() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">2,590 Following</h1>

      <div className="flex flex-col gap-5 py-10">
        {new Array(25).fill(0).map((_, index) => (
          <UserCard key={index} />
        ))}
      </div>

      <Loading />
    </div>
  );
}

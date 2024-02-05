"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data, update } = useSession();

  if (!data) return <div>Not signed in</div>;

  return (
    <div>
      <h1>Client</h1>
      <br />
      <pre className="prose text-wrap whitespace-nowrap">
        <code>Session: {JSON.stringify(data)}</code>
      </pre>
      <br />
      <button onClick={() => update()}>Update session</button>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";

export default function Page() {
    const { data, update } = useSession();

    if (!data) return <div>Not signed in</div>;

    return (
        <div>
            <h1>Client</h1>
            <br />
            <p>Session: {JSON.stringify(data)}</p>
            <br />
            <button onClick={() => update()}>Update session</button>
        </div>
    )
};

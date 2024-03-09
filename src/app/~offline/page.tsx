export default function Page() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        padding: "2rem",
        backgroundColor: "rgb(249, 250, 251)",
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontWeight: "500",
          fontSize: "3rem",
          lineHeight: "1.2",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Offline
      </h1>
      <p
        style={{
          fontFamily: "sans-serif",
          fontWeight: "400",
          fontSize: "1.5rem",
          lineHeight: "1.2",
          letterSpacing: "0.1em",
        }}
      >
        You are offline. Please check your internet connection.
      </p>
    </main>
  );
}

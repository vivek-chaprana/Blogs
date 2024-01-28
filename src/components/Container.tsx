export default function Container({ children }: { children: React.ReactNode }) {
    return <main className="container mx-auto">
        {children}
    </main>

};

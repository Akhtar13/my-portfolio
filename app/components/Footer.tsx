export default function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-zinc-600">
                © {new Date().getFullYear()} Akhtar. Built with Next.js.
            </div>
        </footer>
    );
}

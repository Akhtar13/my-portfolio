export default function ContactPage() {
    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-bold">Contact</h1>
            <p className="text-zinc-700">
                Email: <a className="underline" href="mailto:you@example.com">you@example.com</a>
            </p>
            <p className="text-zinc-700">
                GitHub: <a className="underline" href="https://github.com/yourname" target="_blank" rel="noreferrer">github.com/yourname</a>
            </p>
            <p className="text-zinc-700">
                LinkedIn: <a className="underline" href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer">linkedin.com/in/yourname</a>
            </p>
        </section>
    );
}

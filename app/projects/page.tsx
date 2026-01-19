import { projects } from "@/app/data/projects";

export default function ProjectsPage() {
    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-zinc-700">A selection of work focused on real-world product engineering.</p>

            <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((p) => (
                    <article key={p.slug} className="rounded-lg border p-4">
                        <h2 className="font-semibold">{p.title}</h2>
                        <p className="mt-2 text-sm text-zinc-700">{p.description}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {p.stack.map((s) => (
                                <span key={s} className="rounded-full bg-zinc-100 px-2 py-1 text-xs">
                  {s}
                </span>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-3 text-sm">
                            {p.liveUrl && (
                                <a className="underline" href={p.liveUrl} target="_blank" rel="noreferrer">
                                    Live
                                </a>
                            )}
                            {p.repoUrl && (
                                <a className="underline" href={p.repoUrl} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

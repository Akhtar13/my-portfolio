import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function HomePage() {
  const featured = projects.slice(0, 2);

  return (
      <section className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Hi, I’m Akhtar — Web Developer</h1>
          <p className="text-zinc-700 max-w-2xl">
            I build scalable web products with Next.js and Laravel — focused on performance,
            maintainability, and clean UX.
          </p>
          <div className="flex gap-3">
            <Link href="/projects" className="rounded-md bg-black px-4 py-2 text-white">
              View Projects
            </Link>
            <Link href="/contact" className="rounded-md border px-4 py-2">
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Featured</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
                <div key={p.slug} className="rounded-lg border p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-zinc-700">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                        <span key={s} className="rounded-full bg-zinc-100 px-2 py-1 text-xs">
                    {s}
                  </span>
                    ))}
                  </div>
                  <Link className="mt-4 inline-block text-sm underline" href="/projects">
                    See details →
                  </Link>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}

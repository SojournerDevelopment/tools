import Image from "next/image";
import nextConfig from "../../next.config";
import {ModeToggle} from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src={nextConfig.basePath + "/sojourner-dev-logo.svg"}
          alt="Sojourner Development Logo"
          width={330}
          height={55}
          priority
        />
        <ol className="list-inside list-none text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Welcome to the static tooling page by{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              sojourner.dev
            </code>
          </li>
          <li><p>For more information reach out to <a className="font-[family-name:var(--font-geist-mono)] hover:underline hover:underline-offset-4" href="https://github.com/sojournercntl">@Sojournercntl</a> on Github.</p></li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <ModeToggle/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/sojournercntl?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Repositories
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://sdev-software.com/projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Tools and Projects
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://sojourner.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to sojourner.dev →
        </a>
      </footer>
    </div>
  );
}

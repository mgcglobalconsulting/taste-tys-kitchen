import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-site flex flex-col items-start py-28">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-5xl sm:text-6xl">
        This plate is <em className="text-pinot">empty</em>.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-smoke">
        The page you were looking for isn&apos;t on the menu.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}

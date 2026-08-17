import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-6">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
              NoteApp
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-zinc-950">
            Welcome to Secure Note Taking app
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 sm:text-xl leading-relaxed">
            A simple, secure, and fast way to manage your personal notes.
            Keep your thoughts organized with our robust role-based access control and clean interface.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-white hover:bg-zinc-100">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

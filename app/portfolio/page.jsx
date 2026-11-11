"use client";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  return (
    <main className={`${dark ? "dark" : ""} min-h-screen bg-background text-foreground`}>
      <header className="flex justify-end p-4">
        <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
          {dark ? <Moon /> : <Sun />}
        </button>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">Welcome to My Portfolio</h1>
        </div>
      </div>
    </main>
  );
}
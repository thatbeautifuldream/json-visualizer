"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Braces, Github } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 dark:bg-black px-4 py-2 flex items-center justify-between shadow-sm",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="text-md font-bold text-gray-800 dark:text-white"
        >
          <div className="block sm:hidden">
            <Braces className="w-4 h-4" />
          </div>
          <span className="hidden sm:block">JSON Visualiser</span>
        </Link>
        {children}
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="xs"
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() =>
            window.open(
              "https://github.com/thatbeautifuldream/json-visualizer",
              "_blank"
            )
          }
        >
          <Github className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">
            thatbeautifuldream/json-visualizer
          </span>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarFooter } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Code2Icon,
  HomeIcon,
  LayoutGridIcon,
  LineChartIcon,
  ShareIcon,
  CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "JSON Visualizer",
    href: "/visualizer",
    icon: Code2Icon,
  },
  {
    title: "Explore Examples",
    href: "/explore",
    icon: LayoutGridIcon,
  },
  {
    title: "Usage Stats",
    href: "/stats",
    icon: LineChartIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">JSON Visualizer</h2>
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start")}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/share">
              <ShareIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://cal.com/milind"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

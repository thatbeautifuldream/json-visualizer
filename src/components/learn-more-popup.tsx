"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function LearnMorePopup({
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie =
      "learnMorePopupSeen=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback();
  };

  const decline = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    onDeclineCallback();
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      if (document.cookie.includes("learnMorePopupSeen=true")) {
        setIsOpen(false);
        setTimeout(() => {
          setHide(true);
        }, 700);
      }
    } catch (e) {
      // Handle error
      console.error(e);
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed z-[200] bottom-0 right-0 sm:right-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden"
      )}
    >
      <div className="dark:bg-card bg-background m-3 border border-border shadow-lg">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">Welcome to JSON Visualiser!</h1>
          </div>
          <div className="p-4">
            <p className="text-sm font-normal text-start">
              Transform your JSON data into clear visualizations.
              <br />
              Learn how to supercharge your JSON workflow.
            </p>
            <p className="text-sm font-normal text-muted-foreground mt-2">
              Built by{" "}
              <a
                href="https://milindmishra.com"
                target="_blank"
                className="hover:text-blue-300 transition-colors text-blue-500 hover:underline"
              >
                Milind Mishra
              </a>
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
            <Button onClick={accept} className="w-full">
              Learn More
            </Button>
            <Button onClick={decline} className="w-full" variant="secondary">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

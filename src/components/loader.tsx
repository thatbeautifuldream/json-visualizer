import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
}

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface OwnJsonViewProps {
  parsedJson: any;
  error: string | null;
}

export function OwnJsonView({ parsedJson, error }: OwnJsonViewProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const toggleExpand = (path: string) => {
    setExpandedPaths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderValue = (value: any, path: string) => {
    if (value === null) return <span className="text-gray-500">null</span>;
    if (typeof value === "boolean")
      return <span className="text-blue-600">{String(value)}</span>;
    if (typeof value === "number")
      return <span className="text-green-600">{value}</span>;
    if (typeof value === "string") {
      if (value.startsWith("http")) {
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {value}
          </a>
        );
      }
      return <span className="text-red-600">"{value}"</span>;
    }
    if (Array.isArray(value)) {
      return renderArray(value, path);
    }
    if (typeof value === "object") {
      return renderObject(value, path);
    }
    return String(value);
  };

  const renderArray = (arr: any[], path: string) => {
    const isExpanded = expandedPaths.has(path);
    return (
      <div>
        <span className="cursor-pointer" onClick={() => toggleExpand(path)}>
          {isExpanded ? (
            <ChevronDown className="inline" size={14} />
          ) : (
            <ChevronRight className="inline" size={14} />
          )}
          {` Array(${arr.length})`}
        </span>
        {isExpanded && (
          <ul className="ml-4 list-none">
            {arr.map((item, index) => (
              <li key={index}>{renderValue(item, `${path}.${index}`)}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderObject = (obj: object, path: string) => {
    const isExpanded = expandedPaths.has(path);
    return (
      <div>
        <span className="cursor-pointer" onClick={() => toggleExpand(path)}>
          {isExpanded ? (
            <ChevronDown className="inline" size={14} />
          ) : (
            <ChevronRight className="inline" size={14} />
          )}
          {` Object`}
        </span>
        {isExpanded && (
          <ul className="ml-4 list-none">
            {Object.entries(obj).map(([key, value]) => (
              <li key={key}>
                <span className="text-purple-600">{key}: </span>
                {renderValue(value, `${path}.${key}`)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-auto p-4 font-mono text-sm">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {parsedJson && renderValue(parsedJson, "root")}
    </div>
  );
}

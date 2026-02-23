"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
  value: {
    language?: string;
    code: string;
  };
}

export default function CodeSnippet({ value }: CodeSnippetProps) {
  const language = value.language ?? "javascript";

  return (
    <div className="my-6 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-espresso px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-mono text-cream/60 uppercase tracking-wider">
          {language}
        </span>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <span className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          fontSize: "0.875rem",
          lineHeight: "1.7",
          borderRadius: 0,
        }}
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  );
}

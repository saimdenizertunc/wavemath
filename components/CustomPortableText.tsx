"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import AlertBox from "./portable-text/AlertBox";
import CodeSnippet from "./portable-text/CodeSnippet";
import PostImage from "./portable-text/PostImage";

const components: PortableTextComponents = {
  types: {
    image: PostImage,
    alertBox: AlertBox,
    codeSnippet: CodeSnippet,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl font-black text-espresso mt-12 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl font-bold text-espresso mt-10 mb-3 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl font-bold text-espresso mt-8 mb-2 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-serif text-xl font-semibold text-espresso mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-umber pl-6 py-1 my-6 italic text-coffee text-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="leading-relaxed text-espresso/90 mb-4">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={value?.blank || isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-coffee underline underline-offset-2 decoration-umber hover:text-espresso transition-colors"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-sand text-coffee px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-espresso">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-espresso/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-espresso/90">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

interface CustomPortableTextProps {
  value: PortableTextBlock[];
}

export default function CustomPortableText({ value }: CustomPortableTextProps) {
  return (
    <div className="prose prose-lg max-w-none font-sans">
      <PortableText value={value} components={components} />
    </div>
  );
}

import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineArrayMember({
      title: "Alert Box",
      name: "alertBox",
      type: "object",
      fields: [
        {
          name: "type",
          title: "Alert Type",
          type: "string",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Warning", value: "warning" },
              { title: "Success", value: "success" },
            ],
            layout: "radio",
          },
          initialValue: "info",
        },
        {
          name: "message",
          title: "Message",
          type: "text",
        },
      ],
      preview: {
        select: { title: "type", subtitle: "message" },
      },
    }),
    defineArrayMember({
      title: "Code Snippet",
      name: "codeSnippet",
      type: "object",
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "Python", value: "python" },
              { title: "Bash", value: "bash" },
              { title: "CSS", value: "css" },
              { title: "HTML", value: "html" },
              { title: "JSON", value: "json" },
              { title: "Rust", value: "rust" },
              { title: "Go", value: "go" },
            ],
          },
          initialValue: "javascript",
        },
        {
          name: "code",
          title: "Code",
          type: "text",
        },
      ],
      preview: {
        select: { title: "language", subtitle: "code" },
      },
    }),
  ],
});

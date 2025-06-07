import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import type React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Badge } from "./ui/badge";

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="mb-4 font-bold text-4xl">{children}</h1>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4">{children}</p>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a href={href} className="text-blue-500">
      {children}
    </a>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-4 list-disc pl-5">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-4 list-decimal pl-5">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="mb-4 border-neutral-300 border-l-2 py-2 pl-4 italic">
      {children}
    </blockquote>
  ),
  code: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
        className="rounded-md [&>code]:bg-transparent [&>code]:p-2 [&>code]:rounded-md"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <Badge variant="secondary" className="font-mono rounded-md text-sm">
        {children}
      </Badge>
    );
  },
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return <pre className={cn("bg-transparent p-0", className)} {...props} />;
  },
  img: ({ src, alt }: { src?: string | Blob; alt?: string }) => {
    const imageUrl = src
      ? typeof src === "string"
        ? src
        : URL.createObjectURL(src)
      : "";
    return (
      <Image
        src={imageUrl}
        alt={alt || ""}
        className="mb-4 h-auto w-full rounded-md"
        width={1000}
        height={1000}
      />
    );
  },
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mb-2 font-bold text-2xl">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-1 font-bold text-xl">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="mb-1 font-bold text-lg">{children}</h4>
  ),
  h5: ({ children }: { children?: React.ReactNode }) => (
    <h5 className="mb-1 font-bold text-base">{children}</h5>
  ),
  h6: ({ children }: { children?: React.ReactNode }) => (
    <h6 className="mb-1 font-bold text-sm">{children}</h6>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <Table className="rounded-md">{children}</Table>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <TableHeader>{children}</TableHeader>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <TableBody>{children}</TableBody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <TableRow>{children}</TableRow>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <TableCell>{children}</TableCell>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <TableHead className="bg-muted">{children}</TableHead>
  ),
};

export { components };

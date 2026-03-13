import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { Callout } from "@/components/docs/Callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ─── Standard markdown overrides ───

    h1: ({ children }) => (
      <h1
        className="text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] text-eva-orange mb-6 border-l-4 border-eva-orange pl-4"
        style={{ fontFamily: "var(--font-eva-display)" }}
      >
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        className="text-2xl font-bold uppercase tracking-[0.15em] text-eva-orange mb-4 mt-10 border-b border-eva-mid-gray pb-2"
        style={{ fontFamily: "var(--font-eva-display)" }}
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3
        className="text-lg font-bold uppercase tracking-[0.1em] text-eva-green mb-3 mt-8"
        style={{ fontFamily: "var(--font-eva-display)" }}
      >
        <span className="text-eva-orange/40 mr-2">//</span>
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p
        className="text-eva-white leading-relaxed mb-4 text-[13px]"
        style={{ fontFamily: "var(--font-eva-body)" }}
      >
        {children}
      </p>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        className="text-eva-cyan hover:text-eva-orange underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),

    code: ({ children, className }) => {
      // Fenced code blocks have a className like "language-tsx"
      if (className) {
        const language = className.replace("language-", "");
        return (
          <CodeBlock code={String(children).trimEnd()} language={language} />
        );
      }
      // Inline code
      return (
        <code
          className="bg-eva-dark-gray text-eva-cyan px-1.5 py-0.5 text-xs border border-eva-mid-gray"
          style={{ fontFamily: "var(--font-eva-mono)" }}
        >
          {children}
        </code>
      );
    },

    pre: ({ children }) => {
      // The <pre> wrapping is handled by CodeBlock; just pass through
      return <>{children}</>;
    },

    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border border-eva-mid-gray">
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th
        className="text-left px-3 py-2 bg-eva-dark-gray text-eva-orange uppercase tracking-wider text-xs border-b border-eva-mid-gray font-bold"
        style={{ fontFamily: "var(--font-eva-display)" }}
      >
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-3 py-2 text-eva-white border-b border-eva-mid-gray/40 text-xs font-mono">
        {children}
      </td>
    ),

    ul: ({ children }) => (
      <ul className="mb-4 space-y-1 ml-4">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-4 space-y-1 ml-4 list-decimal list-inside text-eva-orange">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li
        className="text-eva-white text-[13px] flex items-start gap-2"
        style={{ fontFamily: "var(--font-eva-body)" }}
      >
        <span className="text-eva-orange mt-1.5 text-[8px]">&#9654;</span>
        <span>{children}</span>
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-eva-orange bg-eva-dark-gray/50 pl-4 py-2 mb-4 text-eva-white italic">
        {children}
      </blockquote>
    ),

    hr: () => <hr className="border-eva-mid-gray my-8" />,

    // ─── Custom components available in MDX ───
    ComponentPreview,
    PropsTable,
    Callout,

    ...components,
  };
}

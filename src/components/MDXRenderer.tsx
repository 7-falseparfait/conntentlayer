"use client";
import AlertButton from "./AlertButton";
import { useMDXComponent } from "next-contentlayer/hooks";

interface MDXRendererProps {
  code: string;
}

export default function MDXRenderer({ code }: MDXRendererProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <div className="prose prose-lg max-w-none">
      <MDXContent
        components={{
          AlertButton,
        }}
      />
    </div>
  );
}

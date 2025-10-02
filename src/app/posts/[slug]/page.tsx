// app/posts/[slug]/page.tsx
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import MDXRenderer from "@/components/MDXRenderer";

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-gray-600 mb-6">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="relative w-full h-96 mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <MDXRenderer code={post.body.code} />
    </article>
  );
}

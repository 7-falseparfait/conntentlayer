import { allPosts, Post } from "contentlayer/generated";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const PostCards = () => {
  return (
    <div className="py-16">
      <h3 className="text-3xl font-bold mb-8">Latest Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allPosts.map((post: Post) => (
          <Link href={post.url} key={post._id}>
            <Card className="h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-52 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                  <div className="flex items-center gap-x-2 text-sm text-gray-600">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span>{post.author.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostCards;

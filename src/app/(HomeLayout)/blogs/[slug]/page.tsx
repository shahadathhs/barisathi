import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogBySlug } from "@/constant/blogsData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.summary,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen mx-auto max-w-3xl px-4 py-16">
      <article>
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link href="/blogs" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>

        <div className="relative w-full h-[300px] md:h-[400px] mb-8">
          <Image
            src={blog.image || "/placeholder.png"}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full">
            {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                {blog.authorRole}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote source={blog.content} />
        </div>

        <Separator className="my-8" />

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/blogs" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Blogs
            </Link>
          </Button>
        </div>
      </article>
    </main>
  );
}

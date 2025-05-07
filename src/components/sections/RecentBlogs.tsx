import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getRecentBlogs } from "@/constant/blogsData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

export default function RecentBlogs() {
  const recentBlogs = getRecentBlogs(3);
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Rental Housing Blog
          </h2>
          <p className="text-muted-foreground">
            Tips, guides, and insights for tenants and landlords
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/blogs">
            View All Blogs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogs.map((blog) => (
          <Card key={blog.id} className="flex flex-col h-full pt-0">
            <div className="relative h-48 w-full">
              <Image
                src={blog.image || "/placeholder.png"}
                alt={blog.title}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </div>
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">
                {blog.summary}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full gap-2">
                <Link href={`/blogs/${blog.slug}`}>
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

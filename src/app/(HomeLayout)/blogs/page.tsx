import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Building, Home, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllBlogs, getBlogsByCategory } from "@/constant/blogsData";

export default async function BlogsPage() {
  const allBlogs = await getAllBlogs();
  const tenantBlogs = await getBlogsByCategory("tenant");
  const landlordBlogs = await getBlogsByCategory("landlord");
  const generalBlogs = await getBlogsByCategory("general");

  return (
    <main className="flex flex-col min-h-screen py-16">
      <section className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-4">
          <Button asChild variant="ghost" size="sm" className="mb-2">
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Rental Housing Blog
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-[800px]">
            Expert advice, tips, and insights for tenants, landlords, and
            everyone involved in rental housing.
          </p>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tenant" className="gap-1">
                <Users className="h-3 w-3" />
                Tenants
              </TabsTrigger>
              <TabsTrigger value="landlord" className="gap-1">
                <Building className="h-3 w-3" />
                Landlords
              </TabsTrigger>
              <TabsTrigger value="general" className="gap-1">
                <Home className="h-3 w-3" />
                General
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allBlogs.map((blog) => (
                  <Card key={blog.id} className="flex flex-col h-full pt-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={blog.image || "/placeholder.png"}
                        alt={blog.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                        {blog.category.charAt(0).toUpperCase() +
                          blog.category.slice(1)}
                      </div>
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="line-clamp-2">
                        {blog.title}
                      </CardTitle>
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
            </TabsContent>

            <TabsContent value="tenant" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tenantBlogs.map((blog) => (
                  <Card key={blog.id} className="flex flex-col h-full pt-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={blog.image || "/placeholder.png"}
                        alt={blog.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                        Tenant
                      </div>
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="line-clamp-2">
                        {blog.title}
                      </CardTitle>
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
            </TabsContent>

            <TabsContent value="landlord" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {landlordBlogs.map((blog) => (
                  <Card key={blog.id} className="flex flex-col h-full pt-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={blog.image || "/placeholder.png"}
                        alt={blog.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                        Landlord
                      </div>
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="line-clamp-2">
                        {blog.title}
                      </CardTitle>
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
            </TabsContent>

            <TabsContent value="general" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generalBlogs.map((blog) => (
                  <Card key={blog.id} className="flex flex-col h-full pt-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={blog.image || "/placeholder.png"}
                        alt={blog.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                        General
                      </div>
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="line-clamp-2">
                        {blog.title}
                      </CardTitle>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}

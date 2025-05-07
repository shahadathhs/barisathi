import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 py-12 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="relative w-64 h-34 mx-auto">
          <Image 
            src="/placeholder.png" 
            alt="House not found illustration" 
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        
        <p className="text-muted-foreground text-lg">
          We couldn&apos;t find the page you&apos;re looking for. The property might have been rented out or moved to a new location.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/rental-house">
              <Search className="h-4 w-4" />
              Browse Rental House
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

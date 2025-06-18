// This is a custom 404-style page for when a property isn't found in listings

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      {/* Card container with message */}
      <Card className="p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-gray-500 mb-6">
          The property you're looking for doesn't exist or has been removed.
        </p>
        {/* Button linking back to the listings page */}
        <Button asChild>
          <Link href="/dashboard/individual/listings">
            Back to Listings
          </Link>
        </Button>
      </Card>
    </div>
  )
}
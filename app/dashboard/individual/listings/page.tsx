'use client';

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin, Bed, Square, Search, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const mockListings = [
  {
    id: "1",
    title: "Modern 3 Bedroom Apartment",
    location: "Gwarinpa, Abuja",
    price: "₦75,000,000",
    type: "Apartment",
    listingType: "for_sale",
    bedrooms: 3,
    size: "150 sqm",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    company: {
      id: "comp1",
      name: "Abuja Prime Properties",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    }
  },
  {
    id: "2",
    title: "Luxury 5 Bedroom Duplex",
    location: "Maitama, Abuja",
    price: "₦250,000,000",
    type: "House",
    listingType: "for_rent",
    bedrooms: 5,
    size: "400 sqm",
    image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    company: {
      id: "comp2",
      name: "Capital Elite Homes",
      logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    }
  },
  {
    id: "3",
    title: "Executive 4 Bedroom Terrace",
    location: "Wuse 2, Abuja",
    price: "₦120,000,000",
    type: "Terrace",
    listingType: "for_sale",
    bedrooms: 4,
    size: "220 sqm",
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
    company: {
      id: "comp3",
      name: "Victory Estates Abuja",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    }
  },
  {
    id: "4",
    title: "Commercial Land - 5 Hectares",
    location: "Jabi, Abuja",
    price: "₦500,000,000",
    type: "Commercial Land",
    listingType: "for_sale",
    size: "5 Hectares",
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
    company: {
      id: "comp4",
      name: "LandTech Ventures Abuja",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    }
  }
]

export default function Listings() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [listingType, setListingType] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPropertyType = propertyType === "all" || listing.type.toLowerCase() === propertyType
    const matchesListingType = listingType === "all" || listing.listingType === listingType
    
    let matchesPriceRange = true
    if (priceRange !== "all") {
      const price = parseInt(listing.price.replace(/[^\d]/g, ''))
      switch (priceRange) {
        case "under_50m":
          matchesPriceRange = price < 50000000
          break
        case "50m_100m":
          matchesPriceRange = price >= 50000000 && price <= 100000000
          break
        case "above_100m":
          matchesPriceRange = price > 100000000
          break
      }
    }

    return matchesSearch && matchesPropertyType && matchesListingType && matchesPriceRange
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Property Listings</h1>
        </div>

        <main className="p-6">
          <Card className="p-6 mb-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="terrace">Terrace</SelectItem>
                  <SelectItem value="commercial land">Commercial Land</SelectItem>
                </SelectContent>
              </Select>

              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Listing Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="for_sale">For Sale</SelectItem>
                  <SelectItem value="for_rent">For Rent</SelectItem>
                  <SelectItem value="shortlet">Shortlet</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under_50m">Under ₦50M</SelectItem>
                  <SelectItem value="50m_100m">₦50M - ₦100M</SelectItem>
                  <SelectItem value="above_100m">Above ₦100M</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setPropertyType("all")
                  setListingType("all")
                  setPriceRange("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Link key={listing.id} href={`/dashboard/individual/listings/${listing.id}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative h-48">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm",
                        listing.listingType === "for_sale"
                          ? "bg-green-500/90 text-white"
                          : listing.listingType === "for_rent"
                          ? "bg-blue-500/90 text-white"
                          : "bg-purple-500/90 text-white"
                      )}>
                        {listing.listingType === "for_sale"
                          ? "For Sale"
                          : listing.listingType === "for_rent"
                          ? "For Rent"
                          : "Shortlet"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                      {listing.title}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      {listing.type !== 'Commercial Land' && listing.bedrooms && (
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          <span>{listing.bedrooms} Beds</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{listing.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg">{listing.price}</span>
                    </div>
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={listing.company.logo}
                          alt={listing.company.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{listing.company.name}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No properties found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
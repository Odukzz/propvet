'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin, Bed, Square, ArrowLeft, Building, Phone, Mail,
  CheckCircle, Shield, Camera, Share2, Heart, Bath, FileText,
  Ruler, Zap, TreePine, Navigation
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Property {
  id: string
  title: string
  location: string
  fullAddress: string
  price: string
  pricePerSqm?: string
  type: string
  listingType: string
  bedrooms: number
  bathrooms: number
  size: string
  sizeUnit?: string
  totalSqm?: string
  landUse?: string
  zoning?: string
  topography?: string
  soilType?: string
  furnished: string
  parking: string
  images: string[]
  description: string
  features: string[]
  landDetails?: {
    titleDocument: string
    surveyPlan: string
    deedOfAssignment: string
    governmentApproval: string
    accessRoad: string
    utilities: {
      electricity: string
      water: string
      drainage: string
    }
    nearbyLandmarks: string[]
  }
  company: {
    id: string
    name: string
    logo: string
    phone: string
    email: string
    address: string
    verified: boolean
    rating: number
    totalListings: number
  }
  verificationStatus: string
  dateAdded: string
  propertyId: string
}

interface PropertyDetailsClientProps {
  property: Property
}

export function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  // Redirect unauthenticated users who are not 'individual' role
  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  // Recognize if property type is land-related
  const isLand = ['Land', 'Commercial Land', 'Residential Land', 'Industrial Land', 'Agricultural Land'].includes(property.type)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />

      <div className="lg:pl-64">
        {/* Header */}
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
          <h1 className="text-lg font-semibold">Property Details</h1>
        </div>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Property Images */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-4 p-4">
                {/* Main Image */}
                <div className="relative h-96">
                  <img src={property.images[0]} alt={property.title} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                  <div className="absolute top-4 left-4">
                    <Badge className={cn(
                      "text-white",
                      property.listingType === "for_sale" ? "bg-green-600" :
                      property.listingType === "for_rent" ? "bg-blue-600" :
                      "bg-purple-600"
                    )}>
                      {property.listingType.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-gray-800/80 text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-gray-800/80 text-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Additional Images */}
                <div className="grid grid-cols-2 gap-2">
                  {property.images.slice(1, 4).map((img, i) => (
                    <div key={i} className="relative h-44">
                      <img src={img} alt={`${property.title} ${i + 2}`} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                    </div>
                  ))}
                  {property.images.length > 4 && (
                    <div className="relative h-44 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">+{property.images.length - 4} more photos</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Property Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  {/* Basic Info */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{property.title}</h2>
                      <div className="text-gray-500 flex items-center mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.fullAddress}
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="outline">ID: {property.propertyId}</Badge>
                        {property.verificationStatus === 'verified' && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{property.price}</p>
                      {property.pricePerSqm && <p className="text-sm text-gray-500">{property.pricePerSqm} per sqm</p>}
                      <p className="text-sm text-gray-500">Added {property.dateAdded}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  {isLand ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <StatCard icon={Ruler} value={property.size} label={property.sizeUnit || "Size"} />
                      <StatCard icon={Building} value={property.landUse || "Mixed Use"} label="Land Use" />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-3 gap-4">
                      <StatCard icon={Bed} value={property.bedrooms} label="Bedrooms" />
                      <StatCard icon={Bath} value={property.bathrooms} label="Bathrooms" />
                      <StatCard icon={Square} value={property.size} label="Size" />
                    </div>
                  )}

                  {/* Description */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold">Description</h3>
                    <p className="text-gray-700 mt-2">{property.description}</p>
                  </div>
                </Card>

                {/* Conditional: Land Details */}
                {isLand && property.landDetails && (
                  <LandDetailsCard landDetails={property.landDetails} topography={property.topography} soilType={property.soilType} zoning={property.zoning} />
                )}

                {/* Features */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Company Info */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={property.company.logo} alt={property.company.name} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
                    <div>
                      <h3 className="font-semibold text-lg">{property.company.name}</h3>
                      <div className="flex space-x-2 items-center text-sm">
                        {property.company.verified && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <span>★ {property.company.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{property.company.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{property.company.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.company.address}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    {property.company.totalListings} active listings
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Helper component for consistent stat display
function StatCard({ icon: Icon, value, label }: { icon: any, value: string | number, label: string }) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 rounded-xl border">
      <Icon className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-300" />
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  )
}

// Helper component to render land-specific data
function LandDetailsCard({ landDetails, topography, soilType, zoning }: any) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Land Documentation & Details</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-1">Title Document</h4>
          <p className="text-sm text-gray-600">{landDetails.titleDocument}</p>

          <h4 className="font-medium mt-4 mb-1">Survey Plan</h4>
          <p className="text-sm text-gray-600">{landDetails.surveyPlan}</p>

          <h4 className="font-medium mt-4 mb-1">Deed of Assignment</h4>
          <p className="text-sm text-gray-600">{landDetails.deedOfAssignment}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Government Approval</h4>
          <p className="text-sm text-gray-600">{landDetails.governmentApproval}</p>

          <h4 className="font-medium mt-4 mb-1">Topography</h4>
          <p className="text-sm text-gray-600">{topography}</p>

          <h4 className="font-medium mt-4 mb-1">Soil Type</h4>
          <p className="text-sm text-gray-600">{soilType}</p>

          <h4 className="font-medium mt-4 mb-1">Zoning</h4>
          <p className="text-sm text-gray-600">{zoning}</p>
        </div>
      </div>

      <h4 className="font-medium mt-6 mb-2">Nearby Landmarks</h4>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {landDetails.nearbyLandmarks.map((lm: string, i: number) => (
          <li key={i}>{lm}</li>
        ))}
      </ul>
    </Card>
  )
}
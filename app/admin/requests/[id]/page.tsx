import { notFound } from 'next/navigation'
import { AdminRequestDetailClient } from './admin-request-detail-client'

// Updated mock request data - Abuja only
const mockRequestData = {
  "REQ001": {
    id: "REQ001",
    propertyName: "3 Bedroom Apartment, Gwarinpa",
    submittedBy: "John Doe",
    submitterEmail: "john.doe@example.com",
    submitterPhone: "+234 801 234 5678",
    submitterType: "Individual",
    type: "Apartment",
    location: "Gwarinpa, Abuja",
    fullAddress: "Block 15, 7th Avenue, Gwarinpa, Abuja",
    price: "₦75,000,000",
    size: "150 sqm",
    status: "pending",
    submittedAt: "2024-03-20 14:30",
    priority: "normal",
    description: "Modern 3-bedroom apartment in a secure estate with 24/7 security and amenities.",
    documents: [
      { name: "Certificate of Occupancy", type: "pdf", size: "2.4 MB", url: "/docs/coo.pdf" },
      { name: "Survey Plan", type: "pdf", size: "1.8 MB", url: "/docs/survey.pdf" },
      { name: "Deed of Assignment", type: "pdf", size: "1.2 MB", url: "/docs/deed.pdf" },
      { name: "Property Photos", type: "images", size: "5.6 MB", url: "/docs/photos.zip" }
    ]
  },
  "REQ002": {
    id: "REQ002",
    propertyName: "Commercial Land, Lugbe",
    submittedBy: "Real Estate Corp",
    submitterEmail: "company@realestatecompany.com",
    submitterPhone: "+234 802 345 6789",
    submitterType: "Company",
    type: "Land",
    location: "Lugbe, Abuja",
    fullAddress: "Km 25, Airport Road, Lugbe, Abuja",
    price: "₦120,000,000",
    size: "5 Hectares",
    status: "pending",
    submittedAt: "2024-03-20 13:15",
    priority: "high",
    description: "Prime commercial land suitable for major developments along Airport Road.",
    documents: [
      { name: "Certificate of Occupancy", type: "pdf", size: "3.1 MB", url: "/docs/coo2.pdf" },
      { name: "Survey Plan", type: "pdf", size: "2.2 MB", url: "/docs/survey2.pdf" },
      { name: "Deed of Assignment", type: "pdf", size: "1.5 MB", url: "/docs/deed2.pdf" }
    ]
  },
  "REQ003": {
    id: "REQ003",
    propertyName: "2 Bedroom Duplex, Asokoro",
    submittedBy: "Jane Smith",
    submitterEmail: "jane.smith@example.com",
    submitterPhone: "+234 803 456 7890",
    submitterType: "Individual",
    type: "House",
    location: "Asokoro, Abuja",
    fullAddress: "15 Okonjo Iweala Crescent, Asokoro, Abuja",
    price: "₦85,000,000",
    size: "200 sqm",
    status: "pending",
    submittedAt: "2024-03-20 12:45",
    priority: "normal",
    description: "Well-maintained duplex with modern features in an elite area of Asokoro.",
    documents: [
      { name: "Certificate of Occupancy", type: "pdf", size: "2.8 MB", url: "/docs/coo3.pdf" },
      { name: "Survey Plan", type: "pdf", size: "1.9 MB", url: "/docs/survey3.pdf" },
      { name: "Property Photos", type: "images", size: "4.2 MB", url: "/docs/photos3.zip" }
    ]
  },
  "REQ004": {
    id: "REQ004",
    propertyName: "Office Complex, Wuse 2",
    submittedBy: "Prime Properties Ltd",
    submitterEmail: "info@primeproperties.ng",
    submitterPhone: "+234 804 567 8901",
    submitterType: "Company",
    type: "Commercial",
    location: "Wuse 2, Abuja",
    fullAddress: "Plot 12, Aminu Kano Crescent, Wuse 2, Abuja",
    price: "₦500,000,000",
    size: "1000 sqm",
    status: "pending",
    submittedAt: "2024-03-19 16:20",
    priority: "normal",
    description: "Modern office complex in the heart of Abuja's business district.",
    documents: [
      { name: "Certificate of Occupancy", type: "pdf", size: "3.5 MB", url: "/docs/coo4.pdf" },
      { name: "Building Plan", type: "pdf", size: "2.7 MB", url: "/docs/plan4.pdf" },
      { name: "Property Photos", type: "images", size: "6.1 MB", url: "/docs/photos4.zip" }
    ]
  },
  "REQ005": {
    id: "REQ005",
    propertyName: "Residential Land, Gwarinpa",
    submittedBy: "Michael Johnson",
    submitterEmail: "michael.johnson@example.com",
    submitterPhone: "+234 805 678 9012",
    submitterType: "Individual",
    type: "Land",
    location: "Gwarinpa, Abuja",
    fullAddress: "Plot 456, Gwarinpa Estate, Abuja",
    price: "₦45,000,000",
    size: "600 sqm",
    status: "pending",
    submittedAt: "2024-03-19 11:30",
    priority: "normal",
    description: "Residential plot in a well-developed estate with good infrastructure.",
    documents: [
      { name: "Certificate of Occupancy", type: "pdf", size: "2.1 MB", url: "/docs/coo5.pdf" },
      { name: "Survey Plan", type: "pdf", size: "1.6 MB", url: "/docs/survey5.pdf" }
    ]
  }
}

// ✅ Fixed generateStaticParams
export async function generateStaticParams() {
  return Object.keys(mockRequestData).map((id) => ({
    params: { id }, // Wrapped in `params` to match the component's expected props
  }))
}

interface AdminRequestDetailProps {
  params: {
    id: string
  }
}

export default function AdminRequestDetail({ params }: AdminRequestDetailProps) {
  const requestData = mockRequestData[params.id as keyof typeof mockRequestData]

  if (!requestData) {
    notFound()
  }

  return <AdminRequestDetailClient requestData={requestData} />
}

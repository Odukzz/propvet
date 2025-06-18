'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Building2, Upload, X } from "lucide-react"

// Define form validation schema using Zod
const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  type: z.enum(["land", "residential", "commercial"], {
    required_error: "Please select a property type",
  }),
  listingType: z.enum(["for_sale", "for_rent", "shortlet"], {
    required_error: "Please select a listing type",
  }),
  price: z.string().min(1, "Price is required"),
  size: z.string().min(1, "Size is required"),
  sizeUnit: z.enum(["sqm", "hectares", "acres"], {
    required_error: "Please select a size unit",
  }),
  location: z.object({
    state: z.string().min(1, "State is required"),
    lga: z.string().min(1, "LGA is required"),
    address: z.string().min(10, "Full address is required"),
  }),
  description: z.string().min(50, "Description must be at least 50 characters"),
})

// Allowable states — restricted to Abuja only
const nigerianStates = ["FCT"]

export default function AddNewProperty() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  // Initialize uploaded files for the required property documents
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    deed: null,
    survey: null,
    photos: null,
    title: null,
  })

  // Hook form initialization with default values and validation schema
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      type: "land",
      listingType: "for_sale",
      price: "",
      size: "",
      sizeUnit: "sqm",
      location: {
        state: "",
        lga: "",
        address: "",
      },
      description: "",
    },
  })

  // Redirect to login if user isn't authenticated or not a company
  if (!isAuthenticated || user?.role !== 'company') {
    router.push('/login')
    return null
  }

  // Handle document uploads
  const handleFileUpload = (type: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }))
  }

  // Remove uploaded document
  const removeFile = (type: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: null
    }))
  }

  // Submit handler
  const onSubmit = async (values: z.infer<typeof propertySchema>) => {
    try {
      // Placeholder for backend API call
      console.log('Form values:', values)
      console.log('Uploaded files:', uploadedFiles)

      // On success, navigate back to properties list
      router.push('/dashboard/company/properties')
    } catch (error) {
      console.error('Error submitting property:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />

      <div className="lg:pl-64">
        {/* Page Header */}
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Add New Property</h1>
        </div>

        <main className="p-6">
          <Card className="max-w-4xl mx-auto p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2 Plots of Land at Gwarinpa, Abuja" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Property Type & Listing Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Property Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="land">Land</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Listing Type */}
                  <FormField
                    control={form.control}
                    name="listingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select listing type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="for_sale">For Sale</SelectItem>
                            <SelectItem value="for_rent">For Rent</SelectItem>
                            <SelectItem value="shortlet">Shortlet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose how this property will be marketed
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Price & Size */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₦)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 50000000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the total price or rental amount
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Size and Unit */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Size</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sizeUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sqm">Square Meters</SelectItem>
                              <SelectItem value="hectares">Hectares</SelectItem>
                              <SelectItem value="acres">Acres</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Location: State, LGA, Address */}
                <div className="space-y-4">
                  {/* State (Only FCT available) */}
                  <FormField
                    control={form.control}
                    name="location.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {nigerianStates.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase()}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* LGA */}
                  <FormField
                    control={form.control}
                    name="location.lga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Government Area</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Gwarinpa, Wuse, Garki, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="location.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the complete property address in Abuja"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of the property, including features, amenities, and any special characteristics"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Document Uploads */}
                <div className="space-y-4">
                  <Label>Required Documents</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries({
                      deed: "Deed of Assignment",
                      survey: "Survey Plan",
                      title: "Property Title",
                      photos: "Property Photos"
                    }).map(([key, label]) => (
                      <div key={key} className="relative">
                        <input
                          type="file"
                          id={key}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(key, file)
                          }}
                          accept={key === 'photos' ? 'image/*' : '.pdf,.doc,.docx'}
                          multiple={key === 'photos'}
                        />
                        <label
                          htmlFor={key}
                          className={`block p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                            uploadedFiles[key]
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {uploadedFiles[key] ? (
                            <div className="flex items-center justify-center space-x-2">
                              <Building2 className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-medium text-green-600">
                                {uploadedFiles[key]?.name}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  removeFile(key)
                                }}
                                className="p-1 hover:bg-green-100 rounded-full"
                              >
                                <X className="h-4 w-4 text-green-600" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="h-8 w-8 mx-auto text-gray-400" />
                              <div>
                                <p className="text-sm font-medium">{label}</p>
                                <p className="text-xs text-gray-500">
                                  {key === 'photos'
                                    ? 'Upload property images (JPG, PNG)'
                                    : 'Upload document (PDF, DOC)'}
                                </p>
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit for Verification
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </main>
      </div>
    </div>
  )
}
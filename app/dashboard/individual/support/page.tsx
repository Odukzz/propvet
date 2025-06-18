'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Mail, Phone } from "lucide-react"

// Mocked FAQ entries to display in the accordion
const faqs = [
  {
    question: "How long does the verification process take?",
    answer: "The standard verification process typically takes 24-48 hours. However, complex cases might require additional time for thorough verification."
  },
  {
    question: "What documents are required for verification?",
    answer: "Required documents include: Certificate of Occupancy (C of O) or Governor's Consent, Survey Plan, and Deed of Assignment or Transfer."
  },
  {
    question: "How secure is my information?",
    answer: "We employ bank-grade encryption and security measures to protect your data. All documents are stored securely and access is strictly controlled."
  },
  {
    question: "What happens if a property fails verification?",
    answer: "If a property fails verification, you'll receive a detailed report explaining the issues found. You can then work with the property owner to resolve these issues."
  }
]

export default function Support() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  // Redirect to login if not authenticated or not an individual user
  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Support & FAQs</h1>
        </div>

        <main className="p-6">
          {/* Support Contacts */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Phone Support Card */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-sm text-gray-500">Available 9 AM - 5 PM WAT</p>
                  <p className="text-green-600 font-medium">+234 (0) 123 456 7890</p>
                </div>
              </div>
            </Card>

            {/* Email Support Card */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-gray-500">24/7 Response</p>
                  <p className="text-green-600 font-medium">support@propertyverifyng.com</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Support Ticket Form */}
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Support</h2>
                <form className="space-y-4">
                  {/* Subject Field */}
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What can we help you with?" />
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue in detail"
                      className="min-h-[150px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
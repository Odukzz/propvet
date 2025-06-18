'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Mail, Phone, MessageSquare } from "lucide-react"

const faqs = [
  {
    question: "How do I add a new property listing?",
    answer: "To add a new property listing, navigate to the Properties section and click on the 'Add New Property' button. Fill in all the required information about the property and upload relevant documents for verification."
  },
  {
    question: "What documents are required for property verification?",
    answer: "Required documents include: Certificate of Occupancy (C of O) or Governor's Consent, Survey Plan, and Deed of Assignment or Transfer. All documents must be clear and legible."
  },
  {
    question: "How long does the verification process take?",
    answer: "The standard verification process typically takes 24-48 hours. Premium and Enterprise subscribers receive priority verification which can be completed within 12 hours."
  },
  {
    question: "Can I manage multiple properties simultaneously?",
    answer: "Yes, you can manage multiple properties through your dashboard. The number of properties you can list depends on your subscription plan."
  }
]

const supportTickets = [
  {
    id: "T001",
    subject: "Verification Delay",
    status: "Open",
    date: "2024-03-15"
  },
  {
    id: "T002",
    subject: "Document Upload Issue",
    status: "Closed",
    date: "2024-03-10"
  }
]

export default function Support() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== 'company') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Support & Help Center</h1>
        </div>

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Priority Support Line</h3>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                  <p className="text-green-600 font-medium">+234 123 456 7890</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-gray-500">Response within 2 hours</p>
                  <p className="text-green-600 font-medium">support@propvet.com</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Card>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="px-4">{faq.question}</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Recent Support Tickets</h2>
                <Card>
                  <div className="divide-y">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{ticket.subject}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Ticket ID: {ticket.id} • {ticket.date}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            ticket.status === 'Open'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {ticket.status}
                          </span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Submit Support Ticket</h2>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="">Select category</option>
                      <option value="verification">Verification Issues</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Subscription</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue in detail"
                      className="min-h-[150px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="attachments">Attachments (optional)</Label>
                    <Input id="attachments" type="file" multiple />
                  </div>

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
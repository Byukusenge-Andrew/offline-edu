"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Building,
  Globe,
  Send,
  CheckCircle,
  Headphones,
  BookOpen,
  Handshake,
  Newspaper,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

interface ContactForm {
  name: string
  email: string
  company: string
  subject: string
  message: string
  inquiryType: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: "",
      })
    }, 3000)
  }

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 400",
      zipCode: "San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@offlineedu.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM PST",
    },
    {
      city: "New York",
      address: "456 Education Avenue, Floor 12",
      zipCode: "New York, NY 10001",
      phone: "+1 (555) 234-5678",
      email: "ny@offlineedu.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    },
    {
      city: "London",
      address: "789 Learning Lane, Suite 200",
      zipCode: "London, UK EC1A 1BB",
      phone: "+44 20 1234 5678",
      email: "london@offlineedu.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM GMT",
    },
  ]

  const contactOptions = [
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Get help with your account, technical issues, or platform questions",
      action: "Contact Support",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Building,
      title: "Enterprise Sales",
      description: "Discuss enterprise solutions, custom implementations, and volume pricing",
      action: "Talk to Sales",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Handshake,
      title: "Partnerships",
      description: "Explore partnership opportunities, integrations, and collaboration",
      action: "Partner With Us",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Newspaper,
      title: "Media & Press",
      description: "Press inquiries, media kits, and interview requests",
      action: "Media Contact",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const quickLinks = [
    { title: "Help Center", description: "Find answers to common questions", icon: BookOpen },
    { title: "Community Forum", description: "Connect with other users", icon: Users },
    { title: "System Status", description: "Check platform availability", icon: Globe },
    { title: "Documentation", description: "Technical guides and tutorials", icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have questions, feedback, or want to explore partnership
            opportunities, our team is here to help.
          </p>
        </section>

        {/* Contact Options */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`p-3 rounded-full w-fit mx-auto mb-4 ${option.color}`}>
                    <option.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your organization"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => handleInputChange("inquiryType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="support">Customer Support</SelectItem>
                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="media">Media/Press</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            {/* Office Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Our Offices
                </CardTitle>
                <CardDescription>Visit us at one of our global locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{office.city}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p>{office.address}</p>
                          <p>{office.zipCode}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-blue-600">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-blue-600">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Find what you're looking for faster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <link.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{link.title}</h4>
                      <p className="text-sm text-gray-600">{link.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-red-900">Emergency Support</h3>
                </div>
                <p className="text-red-800 text-sm mb-3">
                  For critical system issues affecting your educational operations:
                </p>
                <div className="space-y-2">
                  <a href="tel:+1-555-URGENT" className="block text-red-900 font-medium hover:underline">
                    +1 (555) URGENT-1
                  </a>
                  <a href="mailto:emergency@offlineedu.com" className="block text-red-900 hover:underline">
                    emergency@offlineedu.com
                  </a>
                </div>
                <p className="text-xs text-red-700 mt-3">Available 24/7 for enterprise customers</p>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">What's your response time?</h3>
                <p className="text-gray-600">
                  We typically respond to inquiries within 24 hours during business days. Enterprise customers receive
                  priority support with faster response times.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Do you offer phone support?</h3>
                <p className="text-gray-600">
                  Phone support is available for enterprise customers and urgent technical issues. General inquiries are
                  best handled through our contact form or email.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Can I schedule a demo?</h3>
                <p className="text-gray-600">
                  Contact our sales team to schedule a personalized demo of our platform. We offer both individual and
                  group demonstrations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">How do I report a bug?</h3>
                <p className="text-gray-600">
                  Please use our contact form with "Technical Support" as the inquiry type, or email
                  support@offlineedu.com with detailed information about the issue.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

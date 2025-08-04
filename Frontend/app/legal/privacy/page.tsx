"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Shield,
  Eye,
  Lock,
  Users,
  Globe,
  FileText,
  Mail,
  Calendar,
  CheckCircle,
  Download,
  Settings,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2024"
  const effectiveDate = "January 1, 2024"

  const privacySections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Eye,
      content: [
        {
          subtitle: "Personal Information",
          details: "We collect information you provide directly, such as when you create an account, use our services, or contact us. This includes your name, email address, profile information, and educational preferences."
        },
        {
          subtitle: "Educational Data",
          details: "We collect data related to your learning activities, including lesson progress, quiz results, study patterns, and AI interaction history to provide personalized educational experiences."
        },
        {
          subtitle: "Technical Information",
          details: "We automatically collect certain technical information, including IP address, device information, browser type, operating system, and usage patterns to improve our services."
        },
        {
          subtitle: "Offline Data",
          details: "When using offline features, we store educational content and progress data locally on your device, which syncs when you reconnect to the internet."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Settings,
      content: [
        {
          subtitle: "Educational Services",
          details: "We use your information to provide personalized learning experiences, track progress, generate AI-powered recommendations, and deliver educational content."
        },
        {
          subtitle: "Platform Improvement",
          details: "We analyze usage patterns and feedback to improve our platform, develop new features, and enhance the overall user experience."
        },
        {
          subtitle: "Communication",
          details: "We use your contact information to send important updates, educational content, support responses, and promotional materials (with your consent)."
        },
        {
          subtitle: "Safety and Security",
          details: "We use information to protect our platform, prevent fraud, ensure compliance with our terms of service, and maintain a safe learning environment."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: Users,
      content: [
        {
          subtitle: "Educational Institutions",
          details: "If you're part of an educational institution using our platform, we may share your educational progress and performance data with authorized teachers and administrators."
        },
        {
          subtitle: "Service Providers",
          details: "We work with trusted third-party service providers who help us operate our platform. These providers are bound by strict confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          details: "We may disclose information when required by law, to protect our rights, or to ensure the safety of our users and the public."
        },
        {
          subtitle: "Business Transfers",
          details: "In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the business transaction."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Encryption",
          details: "All data transmission is encrypted using industry-standard SSL/TLS protocols. Sensitive data is encrypted at rest using AES-256 encryption."
        },
        {
          subtitle: "Access Controls",
          details: "We implement strict access controls, multi-factor authentication, and regular security audits to protect your information from unauthorized access."
        },
        {
          subtitle: "Data Centers",
          details: "Our data is stored in secure, certified data centers with physical security measures, redundant systems, and regular backups."
        },
        {
          subtitle: "Incident Response",
          details: "We have comprehensive incident response procedures and will notify affected users and authorities as required in case of any security breaches."
        }
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights and Choices",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Portability",
          details: "You have the right to access your personal information and request a copy of your data in a portable format."
        },
        {
          subtitle: "Correction and Updates",
          details: "You can update your personal information through your account settings or by contacting us directly."
        },
        {
          subtitle: "Deletion",
          details: "You can request deletion of your account and associated data, subject to legal and operational requirements."
        },
        {
          subtitle: "Marketing Communications",
          details: "You can opt out of marketing communications at any time through your account settings or unsubscribe links in emails."
        }
      ]
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      icon: Users,
      content: [
        {
          subtitle: "COPPA Compliance",
          details: "We comply with the Children's Online Privacy Protection Act (COPPA) and do not knowingly collect personal information from children under 13 without parental consent."
        },
        {
          subtitle: "Educational Use",
          details: "When used in educational settings, we work with schools and parents to ensure appropriate privacy protections for student data."
        },
        {
          subtitle: "Parental Rights",
          details: "Parents have the right to review, modify, or delete their child's personal information and can contact us to exercise these rights."
        },
        {
          subtitle: "Data Minimization",
          details: "We collect only the minimum necessary information from children to provide educational services and do not use it for commercial purposes."
        }
      ]
    }
  ]

  const internationalCompliance = [
    {
      region: "European Union",
      regulation: "GDPR",
      description: "We comply with the General Data Protection Regulation, providing EU residents with enhanced privacy rights and protections."
    },
    {
      region: "California",
      regulation: "CCPA",
      description: "We comply with the California Consumer Privacy Act, giving California residents specific rights regarding their personal information."
    },
    {
      region: "Canada",
      regulation: "PIPEDA",
      description: "We follow the Personal Information Protection and Electronic Documents Act for Canadian users."
    },
    {
      region: "Global",
      regulation: "ISO 27001",
      description: "Our security practices are aligned with international standards for information security management."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <section className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-3">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Your privacy is fundamental to our mission. This policy explains how we collect, use, 
            and protect your information when you use OfflineEdu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              <span>Effective: {effectiveDate}</span>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="mb-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Eye className="h-5 w-5 mr-2" />
                Privacy at a Glance
              </CardTitle>
              <CardDescription className="text-blue-800">
                Key points about how we handle your information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-2">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">Secure by Design</h3>
                  <p className="text-sm text-blue-800">End-to-end encryption and secure data storage</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-2">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">Your Control</h3>
                  <p className="text-sm text-blue-800">Access, modify, or delete your data anytime</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-2">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">Global Compliance</h3>
                  <p className="text-sm text-blue-800">GDPR, COPPA, and international standards</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">Transparent</h3>
                  <p className="text-sm text-blue-800">Clear policies and regular updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Privacy Sections */}
        <section className="mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {privacySections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      <section.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-lg font-semibold">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-900 mb-2">{item.subtitle}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.details}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* International Compliance */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">International Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We comply with privacy regulations worldwide to protect users regardless of their location.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internationalCompliance.map((compliance, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge variant="secondary" className="mr-3">{compliance.regulation}</Badge>
                    <h3 className="font-semibold text-lg">{compliance.region}</h3>
                  </div>
                  <p className="text-gray-600">{compliance.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Data Retention
              </CardTitle>
              <CardDescription>
                How long we keep your information and why
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Account Data</h4>
                    <p className="text-gray-600 text-sm">Retained while your account is active and for 30 days after deletion to allow recovery.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Educational Records</h4>
                    <p className="text-gray-600 text-sm">Kept for up to 7 years for educational institutions, or as required by applicable laws.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analytics Data</h4>
                    <p className="text-gray-600 text-sm">Aggregated and anonymized data may be retained indefinitely for research and improvement.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact and Rights */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Exercise Your Rights
                </CardTitle>
                <CardDescription>
                  Contact us to access, modify, or delete your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    You have the right to access, correct, or delete your personal information. 
                    Contact our privacy team to exercise these rights.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a href="mailto:privacy@offlineedu.com" className="text-blue-600 hover:underline">
                        privacy@offlineedu.com
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Response time: Within 30 days</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Privacy Team
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className\

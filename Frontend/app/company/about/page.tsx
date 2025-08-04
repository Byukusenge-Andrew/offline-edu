"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  Globe,
  Award,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Zap,
  TrendingUp,
  Mail,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar?: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
    email?: string
  }
}

interface Milestone {
  year: string
  title: string
  description: string
  icon: any
}

export default function AboutPage() {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former Stanford professor with 15+ years in educational technology. Passionate about making quality education accessible to all.",
      avatar: "/placeholder.svg?height=120&width=120",
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
        email: "sarah@offlineedu.com",
      },
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "AI researcher and former Google engineer. Expert in machine learning and offline-first technologies.",
      avatar: "/placeholder.svg?height=120&width=120",
      social: {
        linkedin: "https://linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen",
        email: "michael@offlineedu.com",
      },
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      role: "Head of Education",
      bio: "Curriculum designer with expertise in personalized learning and assessment. Former UNESCO education consultant.",
      avatar: "/placeholder.svg?height=120&width=120",
      social: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        twitter: "https://twitter.com/emilyrodriguez",
        email: "emily@offlineedu.com",
      },
    },
    {
      id: "4",
      name: "David Kim",
      role: "Head of Product",
      bio: "Product strategist with a focus on user experience and accessibility. Previously at Microsoft Education.",
      avatar: "/placeholder.svg?height=120&width=120",
      social: {
        linkedin: "https://linkedin.com/in/davidkim",
        twitter: "https://twitter.com/davidkim",
        email: "david@offlineedu.com",
      },
    },
    {
      id: "5",
      name: "Maria Santos",
      role: "Head of AI Research",
      bio: "PhD in Machine Learning from MIT. Specializes in educational AI and natural language processing.",
      avatar: "/placeholder.svg?height=120&width=120",
      social: {
        linkedin: "https://linkedin.com/in/mariasantos",
        github: "https://github.com/mariasantos",
        email: "maria@offlineedu.com",
      },
    },
    {
      id: "6",
      name: "James Wilson",
      role: "Head of Engineering",
      bio: "Full-stack engineer with expertise in scalable systems and mobile development. Former Amazon architect.",
      avatar: "/placeholder.svg?height=120&width=120",
      social: {
        linkedin: "https://linkedin.com/in/jameswilson",
        github: "https://github.com/jameswilson",
        email: "james@offlineedu.com",
      },
    },
  ]

  const milestones: Milestone[] = [
    {
      year: "2020",
      title: "Company Founded",
      description:
        "OfflineEdu was founded with a mission to make quality education accessible worldwide, regardless of internet connectivity.",
      icon: Lightbulb,
    },
    {
      year: "2021",
      title: "First AI Integration",
      description:
        "Launched our first AI-powered tutoring system, providing personalized learning experiences for students.",
      icon: Zap,
    },
    {
      year: "2022",
      title: "Offline-First Platform",
      description:
        "Developed revolutionary offline-first technology, enabling seamless learning without internet connectivity.",
      icon: Globe,
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 50+ countries, serving over 100,000 students and 10,000 educators worldwide.",
      icon: TrendingUp,
    },
    {
      year: "2024",
      title: "Advanced AI Features",
      description:
        "Introduced next-generation AI capabilities including adaptive learning paths and intelligent content generation.",
      icon: Award,
    },
  ]

  const values = [
    {
      icon: Globe,
      title: "Accessibility",
      description:
        "We believe education should be accessible to everyone, everywhere, regardless of their circumstances or location.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously push the boundaries of educational technology to create better learning experiences.",
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We design with deep understanding of the challenges faced by educators and learners worldwide.",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "We prioritize data privacy, security, and transparency in everything we do.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster collaborative learning environments where everyone can contribute and grow together.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in our products, services, and impact on global education.",
    },
  ]

  const stats = [
    { label: "Students Served", value: "100,000+", icon: Users },
    { label: "Educators", value: "10,000+", icon: BookOpen },
    { label: "Countries", value: "50+", icon: Globe },
    { label: "Lessons Created", value: "500,000+", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing Education Through
            <span className="text-blue-600"> AI and Accessibility</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            At OfflineEdu, we're on a mission to make quality education accessible to every learner, regardless of their
            location or internet connectivity. Our AI-powered, offline-first platform is transforming how the world
            learns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Join Our Mission</Button>
            <Button size="lg" variant="outline">
              View Careers
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To democratize access to quality education by creating innovative, AI-powered learning platforms that
                  work seamlessly both online and offline. We believe that every student, regardless of their geographic
                  location or economic circumstances, deserves access to world-class educational resources and
                  personalized learning experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-full w-fit mb-4">
                  <Lightbulb className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  A world where quality education knows no boundaries. We envision a future where artificial
                  intelligence enhances human learning, where offline capabilities ensure continuous access to
                  education, and where every learner can reach their full potential through personalized, engaging, and
                  accessible educational experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we build products, serve our community, and work
              together as a team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-fit mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to a global platform serving hundreds of thousands of learners worldwide.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className={`flex items-center ${index % 2 === 0 ? "justify-end" : "justify-start"} mb-3`}>
                          <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <milestone.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <Badge variant="secondary" className="text-sm font-semibold">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of educators, technologists, and innovators is united by a shared passion for
              transforming education through technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xl">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    {member.social.linkedin && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.social.twitter && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.social.github && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.social.email && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`mailto:${member.social.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Education?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join us in our mission to make quality education accessible to everyone. Whether you're an educator,
              student, or organization, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                Join Our Community
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

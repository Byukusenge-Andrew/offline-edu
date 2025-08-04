"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Search,
  Heart,
  Coffee,
  Globe,
  BookOpen,
  Award,
  Home,
  Calendar,
  Mail,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

interface JobListing {
  id: string
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract" | "internship"
  experience: "entry" | "mid" | "senior"
  salary: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  remote: boolean
  postedAt: string
}

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)

  const jobListings: JobListing[] = [
    {
      id: "1",
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "full-time",
      experience: "senior",
      salary: "$140,000 - $180,000",
      description:
        "Join our AI team to develop cutting-edge machine learning models for personalized education. You'll work on natural language processing, recommendation systems, and adaptive learning algorithms.",
      requirements: [
        "5+ years of experience in machine learning and AI",
        "Strong proficiency in Python, TensorFlow, and PyTorch",
        "Experience with NLP and recommendation systems",
        "PhD or Master's in Computer Science, AI, or related field",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
      ],
      responsibilities: [
        "Design and implement AI models for personalized learning",
        "Optimize machine learning pipelines for production",
        "Collaborate with product teams to integrate AI features",
        "Research and prototype new AI technologies",
        "Mentor junior engineers and contribute to technical decisions",
      ],
      benefits: [
        "Competitive salary and equity package",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements and remote options",
        "Professional development budget",
        "Unlimited PTO policy",
      ],
      remote: true,
      postedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Product Designer",
      department: "Design",
      location: "New York, NY",
      type: "full-time",
      experience: "mid",
      salary: "$90,000 - $120,000",
      description:
        "We're looking for a talented Product Designer to help create intuitive and engaging educational experiences. You'll work closely with our product and engineering teams to design user-centered solutions.",
      requirements: [
        "3+ years of product design experience",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Strong understanding of UX/UI principles",
        "Experience with design systems and accessibility",
        "Portfolio demonstrating mobile and web design skills",
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create and maintain design systems",
        "Collaborate with cross-functional teams",
        "Prototype and iterate on design solutions",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health and wellness benefits",
        "Creative workspace and latest design tools",
        "Conference and learning opportunities",
        "Flexible working hours",
      ],
      remote: false,
      postedAt: "2024-01-12",
    },
    {
      id: "3",
      title: "Education Content Specialist",
      department: "Education",
      location: "Remote",
      type: "full-time",
      experience: "mid",
      salary: "$70,000 - $90,000",
      description:
        "Help create world-class educational content for our platform. You'll work with subject matter experts to develop engaging lessons, assessments, and learning materials.",
      requirements: [
        "Master's degree in Education or subject area expertise",
        "3+ years of curriculum development experience",
        "Strong writing and communication skills",
        "Experience with educational technology platforms",
        "Understanding of learning theories and pedagogical approaches",
      ],
      responsibilities: [
        "Develop engaging educational content and curricula",
        "Collaborate with educators and subject matter experts",
        "Review and quality-assure learning materials",
        "Research educational best practices and trends",
        "Support content localization efforts",
      ],
      benefits: [
        "Competitive salary with performance bonuses",
        "Comprehensive benefits package",
        "Professional development opportunities",
        "Work with leading educators worldwide",
        "Flexible remote work environment",
      ],
      remote: true,
      postedAt: "2024-01-10",
    },
    {
      id: "4",
      title: "Frontend Developer",
      department: "Engineering",
      location: "Austin, TX",
      type: "full-time",
      experience: "mid",
      salary: "$95,000 - $125,000",
      description:
        "Build beautiful, responsive, and accessible user interfaces for our educational platform. You'll work with React, TypeScript, and modern web technologies.",
      requirements: [
        "4+ years of frontend development experience",
        "Expert knowledge of React, TypeScript, and modern JavaScript",
        "Experience with responsive design and CSS frameworks",
        "Understanding of web accessibility standards",
        "Familiarity with testing frameworks and CI/CD",
      ],
      responsibilities: [
        "Develop responsive web applications using React",
        "Implement pixel-perfect designs with attention to detail",
        "Optimize applications for performance and accessibility",
        "Collaborate with designers and backend engineers",
        "Write comprehensive tests and documentation",
      ],
      benefits: [
        "Competitive compensation package",
        "Stock options and performance bonuses",
        "Top-tier health and dental coverage",
        "Learning and development budget",
        "Modern office space with great amenities",
      ],
      remote: true,
      postedAt: "2024-01-08",
    },
    {
      id: "5",
      title: "Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "full-time",
      experience: "mid",
      salary: "$80,000 - $100,000",
      description:
        "Lead our marketing efforts to reach educators and students worldwide. You'll develop and execute marketing strategies across digital channels.",
      requirements: [
        "3+ years of digital marketing experience",
        "Experience with B2B and B2C marketing",
        "Strong analytical skills and data-driven approach",
        "Proficiency with marketing automation tools",
        "Excellent written and verbal communication skills",
      ],
      responsibilities: [
        "Develop and execute comprehensive marketing strategies",
        "Manage digital marketing campaigns across channels",
        "Analyze campaign performance and optimize for ROI",
        "Collaborate with sales and product teams",
        "Create compelling marketing content and materials",
      ],
      benefits: [
        "Competitive salary with commission opportunities",
        "Comprehensive benefits package",
        "Marketing conference and training budget",
        "Collaborative and creative work environment",
        "Opportunity to make global impact",
      ],
      remote: false,
      postedAt: "2024-01-05",
    },
    {
      id: "6",
      title: "Data Scientist Intern",
      department: "Data Science",
      location: "Boston, MA",
      type: "internship",
      experience: "entry",
      salary: "$25 - $35/hour",
      description:
        "Join our data science team for a summer internship focused on educational analytics and student performance insights.",
      requirements: [
        "Currently pursuing degree in Data Science, Statistics, or related field",
        "Proficiency in Python and SQL",
        "Experience with data visualization tools",
        "Strong analytical and problem-solving skills",
        "Interest in education technology",
      ],
      responsibilities: [
        "Analyze student learning data and performance metrics",
        "Create data visualizations and reports",
        "Support A/B testing and experimentation",
        "Collaborate with product and engineering teams",
        "Present findings to stakeholders",
      ],
      benefits: [
        "Competitive hourly compensation",
        "Mentorship from senior data scientists",
        "Real-world project experience",
        "Networking opportunities",
        "Potential for full-time offer",
      ],
      remote: false,
      postedAt: "2024-01-03",
    },
  ]

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "Engineering", label: "Engineering" },
    { value: "Design", label: "Design" },
    { value: "Education", label: "Education" },
    { value: "Marketing", label: "Marketing" },
    { value: "Data Science", label: "Data Science" },
    { value: "Sales", label: "Sales" },
    { value: "Operations", label: "Operations" },
  ]

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "Remote", label: "Remote" },
    { value: "San Francisco, CA", label: "San Francisco, CA" },
    { value: "New York, NY", label: "New York, NY" },
    { value: "Austin, TX", label: "Austin, TX" },
    { value: "Los Angeles, CA", label: "Los Angeles, CA" },
    { value: "Boston, MA", label: "Boston, MA" },
  ]

  const jobTypes = [
    { value: "all", label: "All Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ]

  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision insurance" },
    { icon: Home, title: "Remote Work", description: "Flexible work arrangements and remote-first culture" },
    { icon: BookOpen, title: "Learning Budget", description: "$2,000 annual professional development budget" },
    { icon: Calendar, title: "Unlimited PTO", description: "Take time off when you need it with unlimited PTO" },
    { icon: Coffee, title: "Great Perks", description: "Free meals, snacks, and premium coffee in all offices" },
    { icon: Award, title: "Equity Package", description: "Competitive equity compensation for all employees" },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800"
      case "part-time":
        return "bg-blue-100 text-blue-800"
      case "contract":
        return "bg-purple-100 text-purple-800"
      case "internship":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "entry":
        return "bg-green-100 text-green-800"
      case "mid":
        return "bg-yellow-100 text-yellow-800"
      case "senior":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation
    const matchesType = selectedType === "all" || job.type === selectedType

    return matchesSearch && matchesDepartment && matchesLocation && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Mission to
            <span className="text-blue-600"> Transform Education</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We're building the future of education technology. Join our diverse team of passionate educators, engineers,
            and innovators who are making quality education accessible to everyone, everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">View Open Positions</Button>
            <Button size="lg" variant="outline">
              Learn About Our Culture
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work at OfflineEdu?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer competitive compensation, comprehensive benefits, and the opportunity to make a global impact on
              education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Job Search */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your next opportunity to make a difference in education</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                        <Badge className={getExperienceColor(job.experience)}>{job.experience}</Badge>
                        {job.remote && (
                          <Badge variant="outline">
                            <Globe className="h-3 w-3 mr-1" />
                            Remote
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedJob(job)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                            <DialogDescription className="text-lg">
                              {job.department} • {job.location} • {job.type}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Job Description</h4>
                              <p className="text-gray-600">{job.description}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Requirements</h4>
                              <ul className="space-y-1">
                                {job.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Responsibilities</h4>
                              <ul className="space-y-1">
                                {job.responsibilities.map((resp, index) => (
                                  <li key={index} className="flex items-start">
                                    <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Benefits</h4>
                              <ul className="space-y-1">
                                {job.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start">
                                    <Heart className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex space-x-3 pt-4">
                              <Button className="flex-1">
                                <Mail className="h-4 w-4 mr-2" />
                                Apply Now
                              </Button>
                              <Button variant="outline">Save Job</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button>Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedDepartment("all")
                  setSelectedLocation("all")
                  setSelectedType("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Application CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Don't See the Perfect Role?</h2>
            <p className="text-xl text-blue-100 mb-8">
              We're always looking for talented individuals who share our passion for education. Send us your resume and
              let us know how you'd like to contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Mail className="h-4 w-4 mr-2" />
                Send General Application
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                Join Our Talent Network
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

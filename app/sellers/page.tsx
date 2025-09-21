"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, MapPin, Award, Eye } from "lucide-react"
import SellerProfile from "@/components/sellers/seller-profile"

// Mock data for sellers
const mockSellers = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Varanasi, UP",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.8,
    totalReviews: 124,
    joinedDate: "March 2020",
    specialties: ["Silk Weaving", "Traditional Sarees", "Banarasi Work"],
    bio: "Master weaver with 15+ years of experience in traditional Banarasi silk sarees. Learned the craft from my grandmother and continue the family tradition.",
    achievements: [
      "Featured in National Handicrafts Exhibition 2023",
      "Winner of Best Traditional Weaver Award 2022",
      "Certified by Handloom Export Promotion Council",
    ],
    products: [
      {
        id: 1,
        name: "Handwoven Silk Saree",
        price: 8500,
        image: "/beautiful-handwoven-silk-saree-with-traditional-pa.jpg",
        description: "Exquisite handwoven silk saree with traditional Banarasi patterns",
        rating: 4.8,
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Anjali Gupta",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Absolutely beautiful saree! The quality is exceptional and the craftsmanship is outstanding. Priya was very helpful throughout the process.",
        date: "2 weeks ago",
        productName: "Handwoven Silk Saree",
      },
      {
        id: 2,
        userName: "Meera Patel",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        comment: "Great work and fast delivery. The colors are vibrant and the fabric quality is excellent.",
        date: "1 month ago",
        productName: "Traditional Banarasi Saree",
      },
    ],
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Moradabad, UP",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.6,
    totalReviews: 89,
    joinedDate: "June 2019",
    specialties: ["Brass Work", "Metal Crafts", "Decorative Items"],
    bio: "Third-generation brass craftsman specializing in traditional Moradabad brassware. Expert in creating intricate decorative pieces and functional items.",
    achievements: [
      "Export Excellence Award 2023",
      "Traditional Craft Master Certification",
      "Featured in International Craft Fair",
    ],
    products: [
      {
        id: 2,
        name: "Brass Decorative Bowl",
        price: 2200,
        image: "/ornate-brass-decorative-bowl-with-intricate-engrav.jpg",
        description: "Ornate brass bowl with intricate hand-carved designs",
        rating: 4.6,
      },
    ],
    reviews: [
      {
        id: 3,
        userName: "Vikram Singh",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Excellent craftsmanship! The brass work is intricate and beautiful. Highly recommend Rajesh for quality brass items.",
        date: "3 weeks ago",
        productName: "Brass Decorative Bowl",
      },
    ],
  },
  {
    id: 3,
    name: "Meera Devi",
    location: "Jaipur, RJ",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.9,
    totalReviews: 156,
    joinedDate: "January 2018",
    specialties: ["Wood Carving", "Sculptures", "Traditional Art"],
    bio: "Renowned wood carving artist from Jaipur with expertise in creating detailed sculptures and decorative pieces using traditional Rajasthani techniques.",
    achievements: [
      "National Award for Excellence in Wood Carving 2023",
      "Rajasthan State Craft Award Winner",
      "UNESCO Recognition for Traditional Craft",
    ],
    products: [
      {
        id: 3,
        name: "Wooden Elephant Sculpture",
        price: 3500,
        image: "/carved-wooden-elephant-sculpture-with-detailed-cra.jpg",
        description: "Hand-carved wooden elephant with detailed craftsmanship",
        rating: 4.9,
      },
    ],
    reviews: [
      {
        id: 4,
        userName: "Ravi Sharma",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Incredible attention to detail! The wooden elephant is a masterpiece. Meera is truly talented.",
        date: "1 week ago",
        productName: "Wooden Elephant Sculpture",
      },
    ],
  },
]

export default function SellersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [selectedSeller, setSelectedSeller] = useState<any>(null)

  const filteredSellers = mockSellers
    .filter(
      (seller) =>
        seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.totalReviews - a.totalReviews
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">ArtisanBazaar</h1>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Supporting Local Artisans
              </Badge>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Marketplace
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Meet Our Talented Artisans</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Discover the skilled craftspeople behind our beautiful handicrafts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artisans by name, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">Showing {filteredSellers.length} artisans</p>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <Card key={seller.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                  <AvatarFallback className="text-lg">
                    {seller.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{seller.name}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{seller.location}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex">{renderStars(seller.rating)}</div>
                  <span className="font-medium">{seller.rating}</span>
                  <span className="text-muted-foreground text-sm">({seller.totalReviews} reviews)</span>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {seller.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {seller.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{seller.specialties.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Since {seller.joinedDate}</span>
                  </div>
                </div>

                <Button className="w-full" onClick={() => setSelectedSeller(seller)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No artisans found matching your search.</p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {selectedSeller && <SellerProfile seller={selectedSeller} onClose={() => setSelectedSeller(null)} />}
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Filter, ShoppingCart, Heart, MapPin, User, Wand2, Users, Settings } from "lucide-react"
import LoginForm from "@/components/auth/login-form"
import ImageGenerator from "@/components/ai/image-generator"
import TraditionalPayment from "@/components/payments/traditional-payment"
import Link from "next/link"

// Mock data for artisan products
const mockProducts = [
  {
    id: 1,
    name: "Handwoven Silk Saree",
    price: 8500,
    category: "Textiles",
    artisan: "Priya Sharma",
    location: "Varanasi, UP",
    rating: 4.8,
    reviews: 124,
    image: "/beautiful-handwoven-silk-saree-with-traditional-pa.jpg",
    description: "Exquisite handwoven silk saree with traditional Banarasi patterns",
    inStock: true,
  },
  {
    id: 2,
    name: "Brass Decorative Bowl",
    price: 2200,
    category: "Home Decor",
    artisan: "Rajesh Kumar",
    location: "Moradabad, UP",
    rating: 4.6,
    reviews: 89,
    image: "/ornate-brass-decorative-bowl-with-intricate-engrav.jpg",
    description: "Ornate brass bowl with intricate hand-carved designs",
    inStock: true,
  },
  {
    id: 3,
    name: "Wooden Elephant Sculpture",
    price: 3500,
    category: "Sculptures",
    artisan: "Meera Devi",
    location: "Jaipur, RJ",
    rating: 4.9,
    reviews: 156,
    image: "/carved-wooden-elephant-sculpture-with-detailed-cra.jpg",
    description: "Hand-carved wooden elephant with detailed craftsmanship",
    inStock: true,
  },
  {
    id: 4,
    name: "Ceramic Tea Set",
    price: 1800,
    category: "Pottery",
    artisan: "Amit Patel",
    location: "Khurja, UP",
    rating: 4.5,
    reviews: 67,
    image: "/beautiful-ceramic-tea-set-with-traditional-indian-.jpg",
    description: "Beautiful ceramic tea set with traditional patterns",
    inStock: false,
  },
  {
    id: 5,
    name: "Embroidered Wall Hanging",
    price: 1200,
    category: "Textiles",
    artisan: "Sunita Singh",
    location: "Lucknow, UP",
    rating: 4.7,
    reviews: 93,
    image: "/colorful-embroidered-wall-hanging-with-traditional.jpg",
    description: "Colorful embroidered wall hanging with traditional motifs",
    inStock: true,
  },
  {
    id: 6,
    name: "Silver Jewelry Set",
    price: 4500,
    category: "Jewelry",
    artisan: "Kiran Joshi",
    location: "Jaipur, RJ",
    rating: 4.8,
    reviews: 201,
    image: "/elegant-silver-jewelry-set-with-traditional-indian.jpg",
    description: "Elegant silver jewelry set with traditional designs",
    inStock: true,
  },
]

const categories = ["All", "Textiles", "Home Decor", "Sculptures", "Pottery", "Jewelry"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"]

export default function ArtisanMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Featured")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [favorites, setFavorites] = useState<number[]>([])
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showImageGenerator, setShowImageGenerator] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showTraditionalPayment, setShowTraditionalPayment] = useState(false)

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy, priceRange])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    setShowLoginForm(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const handleImageGenerated = (imageUrl: string, prompt: string) => {
    // In a real app, this would save the generated image to the product
    console.log("Generated image:", imageUrl, "from prompt:", prompt)
    // You could add this to a new product or update an existing one
  }

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product)
    setShowTraditionalPayment(true)
  }

  const handlePaymentComplete = (paymentData: any) => {
    console.log("Payment completed:", paymentData)
    // In a real app, this would update the order status and notify the artisan
    setShowTraditionalPayment(false)
    setSelectedProduct(null)
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
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Link href="/sellers">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  View Artisans
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImageGenerator(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                AI Images
              </Button>
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={currentUser.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="text-muted-foreground text-xs">{currentUser.userType}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowLoginForm(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Discover Authentic Indian Handicrafts
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Support local artisans and bring home unique, handcrafted treasures from across India
          </p>
          <div className="flex justify-center gap-4">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2"
            >
              ✨ AI-powered product visualization
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 px-4 py-2">
              💳 Secure INR payments
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products, artisans, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Price Range:</span>
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
              className="w-24"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
              className="w-24"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </Button>
                  {!product.inStock && <Badge className="absolute top-2 left-2 bg-red-500">Out of Stock</Badge>}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg font-semibold text-balance">{product.name}</CardTitle>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3 text-pretty">{product.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{product.artisan}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{product.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-4">{formatPrice(product.price)}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 space-y-2">
                <Button
                  className="w-full"
                  disabled={!product.inStock}
                  variant={product.inStock ? "default" : "secondary"}
                  onClick={() => handleBuyNow(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Buy Now" : "Out of Stock"}
                </Button>
                {product.inStock && (
                  <Badge variant="outline" className="w-full justify-center text-xs">
                    💳 Secure Payment Available
                  </Badge>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setPriceRange({ min: 0, max: 10000 })
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {showImageGenerator && (
        <ImageGenerator onClose={() => setShowImageGenerator(false)} onImageGenerated={handleImageGenerated} />
      )}

      {showTraditionalPayment && selectedProduct && (
        <TraditionalPayment
          product={selectedProduct}
          onClose={() => {
            setShowTraditionalPayment(false)
            setSelectedProduct(null)
          }}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} onLogin={handleLogin} />}

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">ArtisanBazaar</h3>
            <p className="text-muted-foreground">
              Connecting you with India's finest artisans and their authentic handicrafts
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

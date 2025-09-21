"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  ShoppingBag,
  DollarSign,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

// Mock data for admin dashboard
const dashboardStats = {
  totalUsers: 1247,
  totalArtisans: 89,
  totalProducts: 456,
  totalOrders: 2341,
  totalRevenue: 1847500,
  monthlyGrowth: 12.5,
  pendingOrders: 23,
  activeProducts: 423,
}

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Anjali Gupta",
    product: "Handwoven Silk Saree",
    artisan: "Priya Sharma",
    amount: 8500,
    status: "completed",
    paymentMethod: "Card",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Vikram Singh",
    product: "Brass Decorative Bowl",
    artisan: "Rajesh Kumar",
    amount: 2200,
    status: "pending",
    paymentMethod: "UPI",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Meera Patel",
    product: "Wooden Elephant Sculpture",
    artisan: "Meera Devi",
    amount: 3500,
    status: "processing",
    paymentMethod: "Net Banking",
    date: "2024-01-14",
  },
]

const artisanApplications = [
  {
    id: 1,
    name: "Kavita Sharma",
    location: "Jaipur, RJ",
    specialty: "Block Printing",
    experience: "8 years",
    status: "pending",
    appliedDate: "2024-01-10",
    portfolio: ["Traditional Rajasthani prints", "Natural dye techniques", "Cotton textiles"],
  },
  {
    id: 2,
    name: "Arjun Patel",
    location: "Kutch, GJ",
    specialty: "Mirror Work",
    experience: "12 years",
    status: "pending",
    appliedDate: "2024-01-08",
    portfolio: ["Kutchi embroidery", "Mirror work sarees", "Traditional bags"],
  },
]

const productReports = [
  {
    id: 1,
    productName: "Ceramic Vase Set",
    artisan: "Ravi Kumar",
    reportedBy: "Customer123",
    reason: "Quality issues",
    status: "investigating",
    date: "2024-01-12",
  },
  {
    id: 2,
    productName: "Wooden Jewelry Box",
    artisan: "Sunita Devi",
    reportedBy: "BuyerABC",
    reason: "Not as described",
    status: "resolved",
    date: "2024-01-10",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
      case "resolved":
        return "bg-green-100 text-green-800"
      case "pending":
      case "investigating":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleApproveArtisan = (id: number) => {
    console.log("Approving artisan:", id)
    // In real app, this would update the database
  }

  const handleRejectArtisan = (id: number) => {
    console.log("Rejecting artisan:", id)
    // In real app, this would update the database
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">ArtisanBazaar Admin</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Admin Dashboard
              </Badge>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Marketplace
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="artisans">Artisans</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{dashboardStats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Artisans</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalArtisans}</div>
                  <p className="text-xs text-muted-foreground">Verified sellers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">{dashboardStats.activeProducts} active listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(dashboardStats.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">{dashboardStats.totalOrders} completed orders</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New artisan application from Kavita Sharma</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Order #ORD-001 completed successfully</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Product report requires investigation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">New secure payment received</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Platform Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Orders</span>
                    <Badge variant="outline">{dashboardStats.pendingOrders}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Growth</span>
                    <Badge className="bg-green-100 text-green-800">+{dashboardStats.monthlyGrowth}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Products</span>
                    <Badge variant="outline">{dashboardStats.activeProducts}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Artisan Applications</span>
                    <Badge className="bg-yellow-100 text-yellow-800">{artisanApplications.length}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and track customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{order.product}</p>
                            <p className="text-sm text-muted-foreground">by {order.artisan}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(order.amount)}</p>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Artisans Tab */}
          <TabsContent value="artisans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Artisan Applications</CardTitle>
                <CardDescription>Review and approve new artisan applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {artisanApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg" alt={application.name} />
                            <AvatarFallback>
                              {application.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{application.name}</h3>
                            <p className="text-muted-foreground">{application.location}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline">{application.specialty}</Badge>
                              <span className="text-sm text-muted-foreground">{application.experience} experience</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Portfolio:</h4>
                        <div className="flex flex-wrap gap-2">
                          {application.portfolio.map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Applied on {application.appliedDate}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleRejectArtisan(application.id)}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => handleApproveArtisan(application.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Monitor and manage marketplace products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Product management interface would be implemented here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Features: Product approval, inventory tracking, category management
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Reports</CardTitle>
                <CardDescription>Handle customer reports and complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{report.productName}</p>
                            <p className="text-sm text-muted-foreground">by {report.artisan}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Reported by: {report.reportedBy}</p>
                            <p className="text-sm text-muted-foreground">Reason: {report.reason}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

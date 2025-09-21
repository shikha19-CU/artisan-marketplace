"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Shield, CheckCircle, Loader2, Smartphone, Building2 } from "lucide-react"

interface TraditionalPaymentProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    artisan: string
  }
  onClose: () => void
  onPaymentComplete: (paymentData: any) => void
}

export default function TraditionalPayment({ product, onClose, onPaymentComplete }: TraditionalPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [paymentStep, setPaymentStep] = useState("select") // select, processing, complete
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: "",
    bankAccount: "",
    ifscCode: "",
  })
  const [transactionId, setTransactionId] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setPaymentStep("processing")

    // Simulate payment processing
    setTimeout(() => {
      const mockTransactionId = "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase()
      setTransactionId(mockTransactionId)
      setPaymentStep("complete")

      // Call parent callback with payment data
      onPaymentComplete({
        transactionId: mockTransactionId,
        amount: product.price,
        currency: "INR",
        paymentMethod: selectedMethod,
        productId: product.id,
        timestamp: new Date().toISOString(),
      })
    }, 3000)
  }

  if (paymentStep === "processing") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <CardTitle>Processing Payment</CardTitle>
            <CardDescription>Please wait while we process your payment</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Transaction Details:</p>
              <div className="bg-muted p-3 rounded-lg text-sm">
                <p>
                  <strong>Amount:</strong> {formatPrice(product.price)}
                </p>
                <p>
                  <strong>Product:</strong> {product.name}
                </p>
                <p>
                  <strong>Artisan:</strong> {product.artisan}
                </p>
                <p>
                  <strong>Payment Method:</strong> {selectedMethod.toUpperCase()}
                </p>
              </div>
            </div>
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your payment is being processed securely. This may take a few moments.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentStep === "complete") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-600">Payment Successful!</CardTitle>
            <CardDescription>Your payment has been processed successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">Transaction ID:</p>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-white p-2 rounded flex-1">{transactionId}</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Payment Summary:</p>
              <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                <p>
                  <strong>Amount Paid:</strong> {formatPrice(product.price)}
                </p>
                <p>
                  <strong>Product:</strong> {product.name}
                </p>
                <p>
                  <strong>Artisan:</strong> {product.artisan}
                </p>
                <p>
                  <strong>Payment Method:</strong> {selectedMethod.toUpperCase()}
                </p>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your order has been confirmed and the artisan has been notified. You will receive updates via email.
              </AlertDescription>
            </Alert>

            <Button className="w-full" onClick={onClose}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Secure Payment
          </CardTitle>
          <CardDescription>Pay securely using your preferred payment method</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-3">Order Summary</h3>
            <div className="flex gap-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-medium text-balance">{product.name}</p>
                <p className="text-sm text-muted-foreground">by {product.artisan}</p>
                <p className="text-lg font-bold text-primary mt-1">{formatPrice(product.price)}</p>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h3 className="font-medium">Select Payment Method</h3>
            <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card" className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center gap-1">
                  <Smartphone className="h-3 w-3" />
                  UPI
                </TabsTrigger>
                <TabsTrigger value="netbanking" className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  Net Banking
                </TabsTrigger>
              </TabsList>

              {/* Card Payment */}
              <TabsContent value="card" className="mt-4">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* UPI Payment */}
              <TabsContent value="upi" className="mt-4">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        value={paymentData.upiId}
                        onChange={(e) => handleInputChange("upiId", e.target.value)}
                      />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Enter your UPI ID to complete the payment. You'll receive a notification on your UPI app.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Net Banking */}
              <TabsContent value="netbanking" className="mt-4">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Account Number</Label>
                      <Input
                        id="bankAccount"
                        placeholder="1234567890"
                        value={paymentData.bankAccount}
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        placeholder="SBIN0001234"
                        value={paymentData.ifscCode}
                        onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Security Information */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Secure Payment Benefits
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 256-bit SSL encryption for secure transactions</li>
              <li>• PCI DSS compliant payment processing</li>
              <li>• Instant payment confirmation</li>
              <li>• 24/7 customer support</li>
              <li>• Direct support to artisans</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handlePayment} className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Pay {formatPrice(product.price)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import { Heart, Package, RotateCcw, Star, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UserFeatures = () => {
  const recentPurchases = [
    { id: 1, name: "Wireless Headphones", date: "2 days ago", status: "Delivered", price: "$129.99" },
    { id: 2, name: "Smart Watch", date: "1 week ago", status: "Delivered", price: "$199.99" },
    { id: 3, name: "Laptop Stand", date: "2 weeks ago", status: "Returned", price: "$49.99" }
  ];

  const wishlistItems = [
    { id: 1, name: "Gaming Mouse", price: "$89.99", inStock: true },
    { id: 2, name: "Mechanical Keyboard", price: "$159.99", inStock: false },
    { id: 3, name: "Monitor Stand", price: "$79.99", inStock: true }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Your Shopping Experience</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your purchases, manage your wishlist, and handle returns with ease
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Purchases */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-500" />
                <span>Recent Purchases</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{purchase.name}</p>
                    <p className="text-sm text-gray-600">{purchase.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={purchase.status === "Delivered" ? "default" : "secondary"}>
                      {purchase.status}
                    </Badge>
                    <p className="text-sm font-medium text-purple-600 mt-1">{purchase.price}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Wishlist */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500 fill-current" />
                <span>Your Wishlist</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm font-medium text-purple-600">{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={item.inStock ? "default" : "secondary"}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <Button size="sm" disabled={!item.inStock}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                Manage Wishlist
              </Button>
            </CardContent>
          </Card>

          {/* Returns & Support */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-green-500" />
                <span>Returns & Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-green-500 fill-current" />
                  <span className="font-medium text-green-800">Easy Returns</span>
                </div>
                <p className="text-sm text-green-700">30-day hassle-free return policy</p>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start a Return
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 text-center">
                  Need help? Our support team is here 24/7
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserFeatures;

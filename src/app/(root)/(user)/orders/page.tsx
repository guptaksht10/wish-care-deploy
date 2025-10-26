"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, CreditCard, DollarSign, ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dummyOrders = [
  {
    id: "ORD12345",
    date: "2025-07-01",
    status: "Delivered",
    image: "https://via.placeholder.com/80?text=Watch",
    title: "Noise Smartwatch",
    amount: 59.99,
  },
  {
    id: "ORD12346",
    date: "2025-06-25",
    status: "Shipped",
    image: "https://via.placeholder.com/80?text=Earbuds",
    title: "Wireless Earbuds",
    amount: 39.99,
  },
];

const dummyPayments = [
  { id: 1, type: "Visa **** 4242", exp: "12/25" },
  { id: 2, type: "Mastercard **** 1234", exp: "08/26" },
];

const dummyTransactions = [
  { id: "TXN001", date: "2025-06-10", amount: 59.99, status: "Paid" },
  { id: "TXN002", date: "2025-07-01", amount: 39.99, status: "Refunded" },
];

const dummyReturns = [
  { id: "RET001", date: "2025-07-05", orderId: "ORD12345", status: "Processed" },
];

export default function OrdersPage() {
  const [payments, setPayments] = useState(dummyPayments);

  return (
    <>
    <Header />
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 px-6 py-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold text-purple-700 text-center">My Account • Orders</h1>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-4 bg-white rounded-lg shadow-md">
            <TabsTrigger value="orders"><Package className="inline mr-2"/>Orders</TabsTrigger>
            <TabsTrigger value="payments"><CreditCard className="inline mr-2"/>Payments</TabsTrigger>
            <TabsTrigger value="transactions"><DollarSign className="inline mr-2"/>Transactions</TabsTrigger>
            <TabsTrigger value="returns">< ArrowRightLeft className="inline mr-2"/>Returns</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            {dummyOrders.length ? dummyOrders.map(o => (
              <Card key={o.id} className="flex items-center p-4 mb-4 hover:shadow-lg transition">
                <Image
                  src={o.image}
                  alt={o.title}
                  width={80}
                  height={80}
                  className="rounded-md object-contain bg-gray-100"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg">{o.title}</h3>
                  <p className="text-sm text-gray-600">Order ID: {o.id}</p>
                  <p className="text-sm text-gray-600">Date: {o.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-600 font-bold">${o.amount.toFixed(2)}</p>
                  <span className="text-sm text-green-600">{o.status}</span>
                </div>
              </Card>
            )) : (
              <p className="text-center text-gray-600">No orders found.</p>
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            {payments.length ? payments.map(p => (
              <Card key={p.id} className="flex items-center justify-between p-4 mb-4">
                <div>
                  <p className="font-medium">{p.type}</p>
                  <p className="text-sm text-gray-600">Exp: {p.exp}</p>
                </div>
                <Button variant="outline" size="sm">Remove</Button>
              </Card>
            )) : (
              <p className="text-center text-gray-600">No saved payment methods.</p>
            )}
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            {dummyTransactions.length ? (
              <div className="space-y-4">
                {dummyTransactions.map(tx => (
                  <Card key={tx.id} className="flex justify-between p-4">
                    <div>
                      <p className="font-medium">{tx.id}</p>
                      <p className="text-sm text-gray-600">Date: {tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-600 font-bold">${tx.amount.toFixed(2)}</p>
                      <span className={`text-sm ${tx.status === "Paid" ? "text-green-600" : "text-red-500"}`}>{tx.status}</span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No transactions yet.</p>
            )}
          </TabsContent>

          {/* Returns Tab */}
          <TabsContent value="returns">
            {dummyReturns.length ? (
              <div className="space-y-4">
                {dummyReturns.map(r => (
                  <Card key={r.id} className="p-4 flex justify-between items-start">
                    <div>
                      <p><strong>Return ID:</strong> {r.id}</p>
                      <p><strong>Order ID:</strong> {r.orderId}</p>
                      <p className="text-sm text-gray-600">Date: {r.date}</p>
                    </div>
                    <span className="text-orange-600 font-medium">{r.status}</span>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No return requests.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
    <Footer/>
    </>
  );
}

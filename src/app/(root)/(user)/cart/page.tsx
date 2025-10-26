"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const initialCart = [
  {
    id: 1,
    name: "Noise Smartwatch",
    price: 59.99,
    quantity: 1,
    image: "https://via.placeholder.com/300x300?text=Watch",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 39.99,
    quantity: 2,
    image: "https://via.placeholder.com/300x300?text=Earbuds",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
    <Header/>
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 px-6 py-14">
      <section className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-contain bg-gray-100"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </Button>
                      <span className="px-4">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-100"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="text-right mt-10">
              <p className="text-xl font-bold">
                Total:{" "}
                <span className="text-purple-600">${total}</span>
              </p>
              <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:brightness-110">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </section>
    </main>
    <Footer/>
    </>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";

// MUI Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";

const journeySteps = [
  {
    title: "Create Shop",
    desc: "Register your shop using GSTIN & details",
    icon: <StorefrontIcon fontSize="large" className="text-pink-500" />,
  },
  {
    title: "List Products",
    desc: "Add products you want to sell",
    icon: <Inventory2Icon fontSize="large" className="text-purple-500" />,
  },
  {
    title: "Receive Orders",
    desc: "Get orders from users & friends",
    icon: <ShoppingBagIcon fontSize="large" className="text-indigo-500" />,
  },
  {
    title: "Shipment",
    desc: "Stress-free shipping & delivery",
    icon: <LocalShippingIcon fontSize="large" className="text-blue-500" />,
  },
  {
    title: "Payment",
    desc: "Fast & secure payouts",
    icon: <PaymentsIcon fontSize="large" className="text-green-500" />,
  },
];

export default function RegisterShopPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    logo: "",
    gstin: "",
    images: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.gstin) {
      toast.error("Shop name and GSTIN are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create shop");
        return;
      }

      toast.success("🎉 Shop registered successfully!");
      setForm({
        name: "",
        description: "",
        logo: "",
        gstin: "",
        images: [""],
      });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 px-6 py-16">
        {/* FORM SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Register Your Shop
            </h1>
            <p className="text-gray-600 mt-3">
              Start selling and grow socially on WishCare ✨
            </p>
          </div>

          <Card className="rounded-2xl shadow-lg border border-gray-100">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label>Shop Name</Label>
                <Input
                  name="name"
                  placeholder="e.g. Akshat Gadgets"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  placeholder="Tell customers about your shop..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>GSTIN</Label>
                <Input
                  name="gstin"
                  placeholder="22AAAAA0000A1Z5"
                  value={form.gstin}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  Required for seller verification
                </p>
              </div>

              <div className="space-y-2">
                <Label>Logo URL (optional)</Label>
                <Input
                  name="logo"
                  placeholder="https://logo-url.com/logo.png"
                  value={form.logo}
                  onChange={handleChange}
                />
              </div>

              {/* Images Array */}
              <div className="space-y-3">
                <Label>Shop Images</Label>

                {form.images.map((img, idx) => (
                  <Input
                    key={idx}
                    placeholder={`Image URL ${idx + 1}`}
                    value={img}
                    onChange={(e) => {
                      const images = [...form.images];
                      images[idx] = e.target.value;
                      setForm({ ...form, images });
                    }}
                  />
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    setForm({ ...form, images: [...form.images, ""] })
                  }
                >
                  + Add another image
                </Button>
              </div>

              <Button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:brightness-110"
              >
                {loading ? "Creating..." : "Create Shop"}
              </Button>
            </CardContent>
          </Card>
        </motion.section>

        {/* JOURNEY SECTION */}
        <section className="mt-28 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Your Journey on WishCare
            </h2>
            <p className="text-gray-600 mt-3">
              Starting your online business with WishCare is simple
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

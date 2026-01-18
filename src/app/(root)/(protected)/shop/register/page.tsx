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
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// MUI Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsightsIcon from "@mui/icons-material/Insights";

const sellerBenefits = [
  {
    icon: <PeopleAltIcon className="text-pink-500" />,
    title: "Social Discovery",
    desc: "Your products appear via friends & followers",
  },
  {
    icon: <FavoriteIcon className="text-purple-500" />,
    title: "Trust Signals",
    desc: "Likes & wishlists boost conversions",
  },
  {
    icon: <InsightsIcon className="text-indigo-500" />,
    title: "Smart Insights",
    desc: "Know what users actually want",
  },
];

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    logo: "",
    gstin: "",
    images: [""],
  });

 useEffect(() => {
  const checkExistingShop = async () => {
    try {
      const res = await fetch("/api/shops");
      const shop = await res.json();

      if (shop?.slug) {
        router.replace(`/shop/${shop.slug}`);
        return;
      }
    } catch (err) {
      console.error("Failed to check shop");
    } finally {
      setIsChecking(false); // ✅ allow page to render
    }
  };

  checkExistingShop();
}, []);


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

      toast.success("🎉 Shop registered successfully! Redirecting");
      setForm({
        name: "",
        description: "",
        logo: "",
        gstin: "",
        images: [""],
      });
      router.push(`/shop/${data.slug}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-purple-100 px-6 py-20">

       {isChecking ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-purple-50 to-purple-100">
          <p className="text-lg font-semibold text-purple-600 animate-pulse">
            Checking your seller profile...
          </p>
        </div>
       ) : (
        <div>
           {/* JOURNEY SECTION */}
        <section className="max-w-7xl mx-auto mb-28">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Start Selling on WishCare
            </h2>
            <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
              Build trust, sell socially, and grow faster using your network.
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

        {/* REGISTRATION SECTION */}
<motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="max-w-7xl mx-auto"
>
  <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-10 items-stretch">

    {/* LEFT PANEL */}
    {/* LEFT – INFO (NO WHITE CARD) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10 px-md-10"
          >
            <h1 className="text-4xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Sell Socially. Grow Faster !!
            </h1>

            <p className="text-lg text-gray-700 max-w-xl">
              WishCare helps sellers grow using trust, friends, and social proof —
              not ads.
            </p>

            <div className="space-y-6">
              {sellerBenefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-white/70 backdrop-blur border">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{b.title}</h3>
                    <p className="text-sm text-gray-600">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 p-5 text-white shadow-lg max-w-md">
              🚀 <strong>Early sellers</strong> get priority discovery & featured
              placement.
            </div>
          </motion.div>
    {/* VERTICAL DIVIDER (DESKTOP ONLY) */}
    <div className="hidden md:flex items-center justify-center">
      <div className="h-full w-px bg-gradient-to-b from-transparent via-purple-300 to-transparent" />
    </div>

    {/* RIGHT PANEL (FORM CARD) */}
    <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Register Your Shop
        </h1>
        <p className="text-gray-600 mt-3">
          Create your seller profile and start listing products.
        </p>
      </div>

      <div className="space-y-6">

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
            placeholder="What do you sell? Why should customers trust you?"
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
            Required for verification & payouts
          </p>
        </div>

        <div className="space-y-2">
          <Label>Shop Logo (optional)</Label>
          <Input
            name="logo"
            placeholder="https://logo-url.com/logo.png"
            value={form.logo}
            onChange={handleChange}
          />
        </div>

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
          {loading ? "Creating Shop..." : "Create Shop"}
        </Button>
      </div>
    </div>

  </div>
</motion.section>


        </div>
       )}
          
      </main>

      <Footer />
    </>
  );
}

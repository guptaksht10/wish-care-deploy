"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import EditProfileModal from "@/components/EditProfileModal";

import {
  LogOut,
  Pencil,
  ShoppingCart,
  Heart,
  PackageSearch,
  Users,
  Lock,
  Globe,
  MapPin,
  MoreVertical,
  Settings,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { status } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);


  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/users/me")
        .then((res) => res.json())
        .then(setProfile)
        .finally(() => setLoading(false));
    }
  }, [status]);


  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      <Header />

      {/* 🌸 Background upgraded */}
      <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white px-6 py-14">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* ================= PROFILE HEADER ================= */}
          {editOpen ? (
            <EditProfileModal
              profile={profile}
              onClose={() => setEditOpen(false)}
              onSave={(updated: any) => {
                setProfile(updated);
                setEditOpen(false);
              }}
            />
          ) : (

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-10 items-center"
            >
              {/* ⋮ Three dots menu */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-full hover:bg-purple-100 transition"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                    <MenuItem
                      icon={<Pencil size={16} />}
                      label="Edit Profile"
                      onClick={() => {
                        setMenuOpen(false);
                        setEditOpen(true);
                      }}
                    />
                    <MenuItem
                      icon={<Settings size={16} />}
                      label="Account Settings"
                      onClick={() => router.push("/settings")}
                    />
                    <MenuItem
                      icon={<LogOut size={16} />}
                      label="Logout"
                      danger
                      onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    />
                  </div>
                )}
              </div>

              {/* Avatar */}
              <Image
                src={profile.image || "/avatars/placeholder.png"}
                alt="Profile"
                width={160}
                height={160}
                className="rounded-full ring-4 ring-pink-400 shadow-lg object-cover"
              />

              {/* Info */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-purple-700">
                  {profile.name}
                </h2>

                <p className="text-gray-600 max-w-xl">
                  {profile.bio || "No bio added yet."}
                </p>

                {/* Privacy Toggle */}
                <div
                  onClick={() => setIsPublic(!isPublic)}
                  className="inline-flex text-sm items-center gap-2 px-4 py-2 rounded-full cursor-pointer bg-purple-100 text-purple-700 font-semibold w-fit hover:bg-purple-200 transition"
                >
                  {isPublic ? <Globe size={12} /> : <Lock size={12} />}
                  {isPublic ? "Public Profile" : "Private Profile"}
                </div>

                {/* Stats */}
                <div className="flex gap-4 justify-center md:justify-start text-sm text-gray-700">
                  <span><strong>Followers:</strong> {profile._count?.followers ?? 0}</span>
                  <span><strong>Following:</strong> {profile._count?.following ?? 0}</span>
                  <span
                    onClick={() => router.push("/friends")}
                    className="cursor-pointer text-purple-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Users className="w-4 h-4" />
                    Friends: {profile._count?.friends ?? 0}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          {/* ================= ADDRESSES ================= */}
          <Section title="📍 Saved Addresses">
            {profile.address ? (
              <div className="flex items-start gap-3">
                <MapPin className="text-pink-500 mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  {profile.address.line1}, {profile.address.city},{" "}
                  {profile.address.state} - {profile.address.pincode}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">No address added yet.</p>
            )}
          </Section>

          {/* ================= ORDER TIMELINE ================= */}
          <Section title="🚚 Latest Order">
            <div className="space-y-4">
              <TimelineItem label="Order Placed" />
              <div className="ml-6 text-sm text-gray-500">
                Order ID: <strong>123456789</strong><br />
                Shipped on: 12 Jan 2024
              </div>
              <TimelineItem label="Shipped" />
              <TimelineItem label="Out for Delivery" />
              <TimelineItem label="Delivered" active />
            </div>
          </Section>

        </div>
      </main>

      <Footer />
    </>
  );
}

/* ================= HELPERS ================= */

function Section({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl border border-purple-200 shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-purple-700">{title}</h3>
      {children}
    </div>
  );
}

function TimelineItem({ label, active }: any) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-3 h-3 rounded-full ${active ? "bg-green-500" : "bg-purple-300"
          }`}
      />
      <p className="text-gray-700 font-medium">{label}</p>
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition
        ${danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-700 hover:bg-purple-50"}
      `}
    >
      {icon}
      {label}
    </button>
  );
}

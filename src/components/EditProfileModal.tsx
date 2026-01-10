"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function EditProfileModal({ profile, onClose, onSave }: any) {
  const [name, setName] = useState(profile.name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [image, setImage] = useState(profile.image || "");
  const [saving, setSaving] = useState(false);

  
  // 🔎 detect changes
  const hasChanges = useMemo(() => {
    return (
      name.trim() !== (profile.name || "") ||
      bio.trim() !== (profile.bio || "") ||
      image.trim() !== (profile.image || "")
    );
  }, [name, bio, image, profile]);

  async function handleSave() {
    if (!hasChanges || saving) return;

    try {
      setSaving(true);

      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          bio: bio.trim(),
          image: image.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      onSave(updated);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="bg-white rounded-3xl border border-purple-200 shadow-lg p-8 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-purple-700">
            Edit Profile
          </h3>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>

        <div className="h-px bg-purple-100" />

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <Image
            src={image || "/avatars/placeholder.png"}
            alt="Profile preview"
            width={96}
            height={96}
            className="rounded-full ring-4 ring-pink-400 object-cover"
          />

          <div className="flex-1 space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Bio */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

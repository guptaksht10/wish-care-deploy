"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  shopId: string;
  onCreated: (product: any) => void;
};

export default function AddProductModal({
  open,
  onClose,
  shopId,
  onCreated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    images: [""], 
    category: "",
    tags: "",
    stock: "",
    isFeatured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }

    const cleanImages = form.images.filter(Boolean);

    try {
      setLoading(true);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: cleanImages, 
          category: form.category || null,
          tags: form.tags
            ? form.tags.split(",").map((t) => t.trim())
            : [],
          stock: Number(form.stock || 0),
          isFeatured: form.isFeatured,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to add product");
        return;
      }

      toast.success("✅ Product added");
      onCreated(data);
      onClose();

      setForm({
        name: "",
        description: "",
        price: "",
        images: [""],
        category: "",
        tags: "",
        stock: "",
        isFeatured: false,
      });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Price (₹)</Label>
            <Input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          {/* 🔥 MULTIPLE IMAGES */}
          <div className="space-y-2">
            <Label>Product Images</Label>

            {form.images.map((img, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  placeholder={`Image URL ${idx + 1}`}
                  value={img}
                  onChange={(e) => {
                    const images = [...form.images];
                    images[idx] = e.target.value;
                    setForm({ ...form, images });
                  }}
                />

                {form.images.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setForm({
                        ...form,
                        images: form.images.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    ✕
                  </Button>
                )}
              </div>
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

          <div>
            <Label>Category</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Tags (comma separated)</Label>
            <Input
              name="tags"
              value={form.tags}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Stock</Label>
            <Input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full"
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

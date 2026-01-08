"use client";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setActive(img)}
            className={`w-20 h-20 rounded-xl object-cover cursor-pointer border
              ${active === img ? "border-purple-500" : "border-gray-200"}`}
          />
        ))}
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border">
        <img
          src={active}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

"use client";

import Rating from "@mui/material/Rating";

const feedbacks = [
  {
    user: "Rahul",
    rating: 4,
    comment: "Great quality for the price. Totally worth it!",
  },
  {
    user: "Ankit",
    rating: 5,
    comment: "Looks premium. Delivery was fast.",
  },
];

export default function FeedbackSection() {
  return (
    <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-purple-700">
        Customer Feedback
      </h2>

      {feedbacks.map((f, i) => (
        <div key={i} className="border-t pt-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">
              {f.user}
            </span>
            <Rating value={f.rating} size="small" readOnly />
          </div>
          <p className="text-sm text-gray-600">{f.comment}</p>
        </div>
      ))}
    </div>
  );
}

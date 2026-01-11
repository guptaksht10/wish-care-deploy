"use client";

import ReelCard from "./ReelCard";

const reels = [
  {
    id: 1,
    video:
      "https://cdn.coverr.co/videos/coverr-crowded-market-3614/720p.mp4",
    title: "Friends shopping together 💖",
    likes: 120,
    comments: 32,
    likedBy: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
    ],
  },
  {
    id: 2,
    video:
      "https://cdn.coverr.co/videos/coverr-woman-shopping-online-3273",
    title: "Trending fashion picks ✨",
    likes: 98,
    comments: 21,
    likedBy: [
      "https://i.pravatar.cc/40?img=4",
      "https://i.pravatar.cc/40?img=5",
    ],
  },
  {
    id: 3,
    video:
      "https://cdn.coverr.co/videos/coverr-buying-a-new-phone-6787/1080p.mp4",
    title: "Gadget haul 🔥",
    likes: 210,
    comments: 54,
    likedBy: [
      "https://i.pravatar.cc/40?img=6",
      "https://i.pravatar.cc/40?img=7",
      "https://i.pravatar.cc/40?img=8",
    ],
  },
];

export default function ReelsFeed() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {reels.map((reel) => (
        <div key={reel.id} className="h-screen snap-start">
          <ReelCard reel={reel} />
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";

export default function ReelCard({ reel }: any) {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reel.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev: number) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative h-full w-full bg-black flex justify-center">
      {/* VIDEO WRAPPER */}
      <div
        className="relative h-full w-[360px] sm:w-[420px]"
        onClick={() => setPlaying(!playing)}
      >
        <ReactPlayer
          url={reel.video}
          playing={playing}
          muted
          loop
          controls={false}
          width="100%"
          height="100%"
          playsinline
          className="object-cover"
        />

        {/* PAUSE ICON */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 text-white text-3xl p-4 rounded-full">
              ▶
            </div>
          </div>
        )}

        {/* LEFT INFO */}
        <div className="absolute bottom-24 left-4 text-white space-y-3">
          <h3 className="font-semibold text-lg">{reel.title}</h3>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {reel.likedBy.map((url: string, idx: number) => (
                <Image
                  key={idx}
                  src={url}
                  alt="user"
                  width={28}
                  height={28}
                  className="rounded-full border-2 border-black"
                />
              ))}
            </div>
            <span className="text-sm opacity-80">
              Liked by friends
            </span>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="absolute bottom-24 right-4 flex flex-col gap-6 items-center text-white">
          <button onClick={toggleLike} className="flex flex-col items-center">
            <Heart
              className={`h-7 w-7 ${
                liked ? "fill-pink-500 text-pink-500" : ""
              }`}
            />
            <span className="text-xs mt-1">{likes}</span>
          </button>

          <button className="flex flex-col items-center">
            <MessageCircle className="h-7 w-7" />
            <span className="text-xs mt-1">{reel.comments}</span>
          </button>

          <button className="flex flex-col items-center">
            <Share2 className="h-7 w-7" />
            <span className="text-xs mt-1">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

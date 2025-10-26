"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserPlus, Users, CheckCircle2, XCircle } from "lucide-react";

const suggestedFriends = [
  { id: 1, name: "Sakshi Mehta", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 2, name: "Rohan Singh", image: "https://randomuser.me/api/portraits/men/34.jpg" },
  { id: 3, name: "Mehul Sharma", image: "https://randomuser.me/api/portraits/men/54.jpg" },
];

const incomingRequests = [
  { id: 4, name: "Kriti Jain", image: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 5, name: "Aman Tiwari", image: "https://randomuser.me/api/portraits/men/88.jpg" },
];

const initialFriends = [
  { id: 6, name: "Ishita Rawal", image: "https://randomuser.me/api/portraits/women/91.jpg" },
  { id: 7, name: "Harsh Vardhan", image: "https://randomuser.me/api/portraits/men/70.jpg" },
];

export default function FriendsPage() {
  const [friends, setFriends] = useState(initialFriends);
  const [requests, setRequests] = useState(incomingRequests);

  const acceptRequest = (id: number) => {
    const user = requests.find((r) => r.id === id);
    if (user) {
      setFriends([...friends, user]);
      setRequests(requests.filter((r) => r.id !== id));
    }
  };

  const declineRequest = (id: number) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-6 py-14">
        <div className="max-w-5xl mx-auto space-y-14">

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-purple-700">Friends & Connections</h1>
            <p className="text-gray-600 mt-2">Manage requests, explore suggestions, and grow your social circle.</p>
          </div>

          {/* Friend Requests */}
          <section>
            <h2 className="text-2xl font-semibold text-pink-600 flex items-center gap-2 mb-4">
              <UserPlus className="w-6 h-6" /> Friend Requests
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {requests.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">You have no new requests 🎉</div>
              ) : (
                requests.map((user) => (
                  <div key={user.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                    <Image src={user.image} alt={user.name} width={50} height={50} className="rounded-full border" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{user.name}</h4>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          className="bg-purple-500 text-white"
                          onClick={() => acceptRequest(user.id)}
                        >
                          <CheckCircle2 className="mr-1 h-4 w-4" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => declineRequest(user.id)}
                        >
                          <XCircle className="mr-1 h-4 w-4" /> Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Suggested Friends */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-600 flex items-center gap-2 mb-4">
              <Users className="w-6 h-6" /> Suggested Friends
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {suggestedFriends.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-[1.02]"
                >
                  <Image src={user.image} alt={user.name} width={50} height={50} className="rounded-full border" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{user.name}</h4>
                    <Button
                      size="sm"
                      className="mt-2 bg-pink-500 text-white hover:bg-pink-600"
                    >
                      <UserPlus className="mr-1 h-4 w-4" /> Add Friend
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Current Friends */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Friends</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {friends.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">You haven’t added any friends yet 🫂</div>
              ) : (
                friends.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <Image src={user.image} alt={user.name} width={50} height={50} className="rounded-full border" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{user.name}</h4>
                      <p className="text-sm text-gray-500">Friend</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

export default function AvatarStack({ users }: { users: any[] }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {users.slice(0, 5).map((u) => (
          <img
            key={u.id}
            src={u.avatar}
            className="w-9 h-9 rounded-full border-2 border-white"
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {users.length} people liked this
      </span>
    </div>
  );
}

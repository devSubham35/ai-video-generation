"use client";

import Image from "next/image";
import { useState } from "react";

type Avatar = {
    gender: string;
    avatar_id: string;
    avatar_name: string;
    preview_image_url: string;
    preview_video_url: string;
    premium: boolean;
};

type Props = {
    avatars: Avatar[];
};

export default function HeygenAvatarGrid({ avatars }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {avatars.map((avatar) => {
                const isHovered = hovered === avatar.avatar_id;

                return (
                    <div
                        key={avatar.avatar_id}
                        className="rounded-xl border border-neutral-800 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
                        onMouseEnter={() => setHovered(avatar.avatar_id)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className="relative w-full aspect-video bg-black">
                            {!isHovered ? (
                                <Image
                                    width={1280}
                                    height={720}
                                    src={avatar.preview_image_url}
                                    alt={avatar.avatar_name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    src={avatar.preview_video_url}
                                    autoPlay
                                    // muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {avatar.premium && (
                                <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded font-semibold">
                                    PREMIUM
                                </span>
                            )}
                        </div>

                        <div className="p-3 space-y-1">
                            <h3 className="text-sm font-semibold truncate">
                                {avatar.avatar_name}
                            </h3>
                            <p className="text-xs text-gray-500 capitalize">
                                {avatar.gender}
                            </p>
                            <p className="text-[10px] text-gray-400 break-all">
                                {avatar.avatar_id}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

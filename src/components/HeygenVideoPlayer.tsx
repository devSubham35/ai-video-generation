"use client";

import { metaTypes } from "@/app/page";
import { IoVideocam } from "react-icons/io5";
import { getvideoStatus } from "@/app/action";
import { GenerateVideoStatusResponse } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface HeygenVideoPlayerProps {
    meta: metaTypes | null;
    parentLoading?: boolean;
    setMeta: Dispatch<SetStateAction<metaTypes | null>>;
}

export default function HeygenVideoPlayer({ meta, parentLoading }: HeygenVideoPlayerProps) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<GenerateVideoStatusResponse | null>(null);

    useEffect(() => {
        if (!meta?.video_id) return;

        const interval = setInterval(async () => {
            const res = await getvideoStatus(meta?.video_id as string);
            setData(res);

            if (res.status === "completed") {
                clearInterval(interval);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [meta?.video_id]);


    if (!meta?.video_id) {
        return (
            <div className="w-full bg-[#141414] border border-white/10 
            rounded-2xl shadow-xl p-6 flex justify-center items-center text-2xl">
                <p className="text-neutral-600 flex items-center justify-center flex-col gap-2 font-semibold">
                    <IoVideocam className="text-8xl" />
                    Write some topic to generate video
                </p>
            </div>
        );
    }

    if (data?.status !== "completed" || parentLoading) {
        return (
            <div className="w-full bg-[#141414] border border-white/10 
            rounded-2xl shadow-xl p-6 flex justify-center items-center text-2xl">
                <p className="text-neutral-600 flex items-center justify-center flex-col gap-2 font-semibold">
                    <IoVideocam className="text-8xl animate-pulse" />
                    Processing the video...
                </p>
            </div>
        );
    }

    console.log(data, "++66")

    return (
        <div className="w-full bg-[#141414] border border-white/10 rounded-2xl shadow-xl p-6 space-y-6">
            {/* Video */}
            <div className="relative w-full rounded-lg overflow-hidden bg-black">
                <video
                    controls
                    preload="metadata"
                    className="w-full h-auto"
                    poster={data.thumbnail_url}
                    onLoadedData={() => setLoading(false)}
                >
                    <source src={data.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Metadata */}
            <div className="text-sm text-neutral-600 space-y-1">
                <p>
                    <strong>Duration:</strong> {data?.duration?.toFixed(2)}s
                </p>
                <p>
                    <strong>Created:</strong>{" "}
                    {new Date(Number(data?.created_at) * 1000).toLocaleString()}
                </p>
                <p>
                    <strong>Video ID:</strong> {data?.id}
                </p>
            </div>
        </div>
    );
}

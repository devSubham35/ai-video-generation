"use client";

import { useEffect, useState } from "react";
import { GenerateVideoStatusResponse } from "@/types";
import TextSummarizer from "@/components/AISummarizer";
import HeygenVideoPlayer from "@/components/HeygenVideoPlayer";

export interface metaTypes {
  prompt?: string;
  video_id?: string;
  userInput?: string;
  data?: GenerateVideoStatusResponse | null
}

const STORAGE_KEY = "heygen_meta";

const HomePage = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const [meta, setMeta] = useState<metaTypes | null>(() => {
    if (typeof window === "undefined") {
      return { prompt: "", video_id: "", userInput: "" };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : { prompt: "", video_id: "", userInput: "" };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meta));
  }, [meta]);


  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f0f] to-[#1a1a1a] text-gray-100 p-6 flex justify-between gap-8">
      <TextSummarizer
        meta={meta}
        loading={loading}
        setMeta={setMeta}
        setLoading={setLoading}
      />
      <HeygenVideoPlayer
        meta={meta}
        setMeta={setMeta}
        parentLoading={loading}
      />
    </div>
  );
};

export default HomePage;

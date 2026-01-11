"use client";

import { BiCopy } from "react-icons/bi";
import { useRef, useState } from "react";
import { IoIosPause } from "react-icons/io";
import { IoPlayCircle } from "react-icons/io5";
import { copyToClipboard } from "@/helper/_helper";

export interface Voice {
  voice_id?: string
  language: string
  gender: string
  name: string
  preview_audio: string | null
  support_pause: boolean
  emotion_support: boolean
  support_interactive_avatar: boolean
  support_locale: boolean
}


type Props = {
  voices: Voice[];
};

export default function VoiceList({ voices }: Props) {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (voice: Voice) => {
    if (!voice.preview_audio) {
      alert("No preview available for this voice");
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (playingId === voice.voice_id) {
      setPlayingId(null);
      return;
    }

    const audio = new Audio(voice.preview_audio);
    audioRef.current = audio;
    setPlayingId(String(voice?.voice_id));

    audio.play().catch(console.error);

    audio.onended = () => setPlayingId(null);
  };

  /// Copy the voice id
  const handleCopy = async (text: string) => {
    await copyToClipboard(text)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {voices.map((voice) => (
        <div
          key={voice.voice_id}
          className={`flex items-center justify-between border p-2 rounded-xl
            ${playingId === voice.voice_id ? "border-pink-600 bg-pink-700/10" : "border-neutral-800"}`}
        >
          <div className="px-2">
            <h3 className="font-semibold">{voice.name}</h3>
            <p className="text-sm text-neutral-600">
              {voice.language} · {voice.gender}
            </p>
            <h1 className="text-pink-500 mb-1 text-sm opacity-50 flex items-center gap-2">
              {voice?.voice_id}
              <BiCopy onClick={()=> handleCopy(voice?.voice_id as string)} className="cursor-pointer text-white text-base active:scale-95 transition-transform" />
            </h1>
          </div>

          <button
            onClick={() => handlePlay(voice)}
            className={`size-10 rounded-full flex items-center justify-center text-5xl font-medium text-pink-500 cursor-pointer`}
          >
            {playingId === voice.voice_id ? <IoIosPause className="text-2xl" /> : <IoPlayCircle  />}
          </button>
        </div>
      ))}
    </div>
  );
}

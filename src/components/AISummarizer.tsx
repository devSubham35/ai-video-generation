"use client";

import { metaTypes } from "@/app/page";
import { initiateGenerateVideo } from "@/app/action";
import { Dispatch, SetStateAction, useState } from "react";

interface TextSummarizerProps {
  meta: metaTypes | null;
  setMeta: Dispatch<SetStateAction<metaTypes | null>>;
  loading?: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function TextSummarizer({ meta, setMeta, loading, setLoading }: TextSummarizerProps) {

  const [error, setError] = useState("");
  const [text, setText] = useState(meta?.userInput ?? "");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setMeta(null);

    try {
      /// Trigger the summarization and get the event ID
      const res = await initiateGenerateVideo(text);

      /// Extract summary from the output 
      const prompt = res?.result?.prompt

      setMeta({
        prompt,
        video_id: res?.result?.video_id,
        userInput: prompt
      })

    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to summarize";
      setError(message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl bg-[#141414] border border-white/10 rounded-2xl shadow-xl p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            AI Generated Prompt
          </h1>
          <p className="text-sm text-gray-400">
            Write video generation topic
          </p>
        </div>

        {/* Input */}
        <textarea
          value={Number(meta?.userInput?.length) > 0 ? meta?.userInput : text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          disabled={loading}
          className="w-full min-h-40 rounded-xl bg-[#0f0f0f] border border-white/10 p-4 
          text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none disabled:opacity-50"
        />

        {/* Action */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
          className="w-full h-11 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 
          transition font-medium border border-neutral-800"
        >
          {loading ? "Generating..." : "Generate Video"}
        </button>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {meta?.prompt && (
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-4 space-y-2">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Generated prompt
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              {meta?.prompt}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
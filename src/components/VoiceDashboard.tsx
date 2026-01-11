/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Voice } from "./VoiceList";
import StatCard from "./StaticCards";
import { useMemo, useState } from "react";

export const normalizeVoices = (voices: Voice[]) =>
    voices.map((v) => ({
        ...v,
        name: v.name.trim(),
        language: v.language.trim(),
        gender: v.gender.toLowerCase(),
    }));

export const getVoiceStats = (voices: Voice[]) => {
    const total = voices.length;

    const male = voices.filter(v => v.gender === "male").length;
    const female = voices.filter(v => v.gender === "female").length;

    const languages = voices.reduce<Record<string, number>>((acc, v) => {
        acc[v.language] = (acc[v.language] || 0) + 1;
        return acc;
    }, {});

    return {
        total,
        male,
        female,
        languages,
    };
};

type Props = {
    voices_data: Voice[];
};

export default function VoiceDashboard({ voices_data }: Props) {

    const voices = useMemo(() => normalizeVoices(voices_data), [voices_data]);

    const [gender, setGender] = useState<"all" | "male" | "female">("all");
    const [language, setLanguage] = useState<string>("all");

    const filteredVoices = useMemo(() => {
        return voices.filter((v) => {
            if (gender !== "all" && v.gender !== gender) return false;
            if (language !== "all" && v.language !== language) return false;
            return true;
        });
    }, [voices, gender, language]);

    const stats = useMemo(
        () => getVoiceStats(filteredVoices),
        [filteredVoices]
    );

    const languages = Object.keys(
        voices.reduce((acc: any, v) => {
            acc[v.language] = true;
            return acc;
        }, {})
    );

    return (
        <div className="p-6 space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="border border-neutral-800 rounded-md px-3 py-2"
                >
                    <option value="all">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border border-neutral-800 rounded-md px-3 py-2"
                >
                    <option value="all">All Languages</option>
                    {languages.map((l) => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-5 gap-4">
                <StatCard title="Total Voices" value={stats.total} />
                <StatCard title="Male Voices" value={stats.male} />
                <StatCard title="Female Voices" value={stats.female} />
                <StatCard title="Languages" value={Object.keys(stats.languages).length} />
                <div className="rounded-xl border border-neutral-800 p-6 shadow-amber-200 shadow-inner">
                    <h3 className="font-semibold mb-3">Language Breakdown</h3>
                    <div className="space-y-2 text-sm">
                        {Object.entries(stats.languages).map(([lang, count]) => (
                            <div key={lang} className="flex justify-between">
                                <span className="text-neutral-400">{lang}</span>
                                <span>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

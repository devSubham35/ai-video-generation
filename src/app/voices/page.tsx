'use client'

import { useMemo, useState } from 'react'
import { voices_data } from '@/json/voices'
import VoiceList from '@/components/VoiceList'

type GenderFilter = 'all' | 'male' | 'female'

const AvatarsPage = () => {

  const [gender, setGender] = useState<GenderFilter>('all')

  const lan_list = ['English']

  const voicesData = useMemo(() => {
    return voices_data?.voices.filter((voice) => {
      const isLanguageMatch = lan_list.includes(voice.language)
      const isPlayable = voice.preview_audio
      const isAvatarSupported = voice.support_interactive_avatar

      const isGenderMatch =
        gender === 'all' || voice.gender?.toLowerCase() === gender

      return (
        isLanguageMatch &&
        isPlayable &&
        isAvatarSupported &&
        isGenderMatch
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender])

  return (
    <div className='min-h-screen p-4 w-full'>

      {/* Gender Toggle */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className='text-4xl text-white font-bold'>Character Voices</h1>
        <div className="w-fit rounded-lg bg-white/10 p-0.5">
          {(['all', 'male', 'female'] as GenderFilter[]).map((item) => (
            <button
              key={item}
              onClick={() => setGender(item)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition cursor-pointer
                ${
                  gender === item
                    ? 'bg-black text-white'
                    : 'text-neutral-400'
                }
              `}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <VoiceList voices={voicesData} />
    </div>
  )
}

export default AvatarsPage

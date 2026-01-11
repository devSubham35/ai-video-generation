import { avatarsData } from '@/json/avatars'
import HeygenAvatarGrid from '@/components/HeygenAvatarGrid'

const AvatarsPage = () => {
  return (
    <>
      <HeygenAvatarGrid avatars={avatarsData.avatars} />
    </>
  )
}

export default AvatarsPage

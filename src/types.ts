export interface GenerateVideoApiResponse {
  error: never
  data: { video_id: string }
}

//////////////////////////////////////
//////////////////////////////////////

export interface GenerateVideoStatusApiResponse {
  code: number
  message: string
  data: GenerateVideoStatusResponse
}

export interface GenerateVideoStatusResponse {
  created_at?: number
  duration?: number | undefined
  error?: string
  gif_url?: string
  id?: string
  status?: "completed" | "processing" | string
  thumbnail_url?: string
  video_url?: string | undefined
  video_url_caption?: string
}

//////////////////////////////////////
//////////////////////////////////////
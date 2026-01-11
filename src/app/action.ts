/////////////////////////////////////////////////////
/// polling Video status & result
/////////////////////////////////////////////////////

export async function getvideoStatus(video_id: string) {
    const response = await fetch(
        ` https://api.heygen.com/v1/video_status.get?video_id=${video_id}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Api-Key": "sk_V2_hgu_kJWaKk0eWHJ_tHKX2NBiI4nCXOaz4p8c9qwsVvipzXEW" /// overwrite this api key with your own api key
            }
        }
    );

    const res = await response.json();

    if (res?.data?.error) {
        throw new Error(`Failed to create video: ${response.statusText}`);
    }

    return res?.data || {}
}

/////////////////////////////////////////////////////
/// Start Generate video
/////////////////////////////////////////////////////

export async function initiateGenerateVideo(videoPrompt: string) {
    const video_payload = {
        title: `Topic - ${videoPrompt?.slice(0, 60)}`,
        video_inputs: [
            {
                character: {
                    type: "avatar",
                    avatar_id: "Joel_standing_gym_front",
                    scale: 0.93,
                    avatar_style: "closeUp",
                    offset: {
                        "x": 0,
                        "y": 0
                    }
                },
                voice: {
                    type: "text",
                    voice_id: "1ae3be1e24894ccabdb4d8139399f721",
                    input_text: videoPrompt ?? "",
                    speed: 1,
                    pitch: 10,
                    emotion: "Excited",
                    locale: "en-US"
                },
                background: {
                    "type": "color",
                    "value": "#000000"
                }
            }
        ],
        dimension: {
            width: 1280,
            height: 720
        }
    }

    const response = await fetch(
        `https://api.heygen.com/v2/video/generate`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Api-Key": "sk_V2_hgu_kJWaKk0eWHJ_tHKX2NBiI4nCXOaz4p8c9qwsVvipzXEW" /// overwrite this api key with your own api key
            },
            body: JSON.stringify(video_payload)
        }
    );

    const res = await response.json();

    if (res?.error) {
        throw new Error(`Failed to fetch runs: ${response.statusText}`);
    }

    return {
        result: {
            success: true,
            userInput: prompt,
            prompt: videoPrompt,
            video_id: res?.data?.video_id
        }
    }
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
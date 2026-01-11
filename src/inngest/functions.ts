import { inngest } from "./client";

export const generateVideo = inngest.createFunction(
    { id: "generate-video" },
    { event: "generate-video" },
    async ({ event }) => {

        const { prompt } = event.data;

        // const llmResponse = await step.ai.infer("llm-video-script", {
        //     model: step.ai.models.openai({
        //         model: "gpt-5",
        //         apiKey: process.env.OPENAI_API_SECRET,
        //     }),
        //     body: {
        //         messages: [
        //             {
        //                 role: "system",
        //                 content: `
        //                     You are a professional AI video script writer.

        //                     Rules:
        //                     - Write a short spoken script for an AI avatar
        //                     - Friendly, confident, and clear tone
        //                     - 10 words maximum
        //                     - No emojis
        //                     - No markdown
        //                     - No stage directions
        //                     - Output ONLY the script text
        //                 `.trim(),
        //             },
        //             {
        //                 role: "user",
        //                 content: prompt,
        //             },
        //         ],
        //     },
        // });

        /// Step 2: Extract the proper prompt from LLM
        // const videoPrompt = llmResponse?.choices[0]?.message?.content

        const videoPrompt = prompt

        /// Step 3: Prepare the video payload
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
                    "X-Api-Key": "sk_V2_hgu_kJWaKk0eWHJ_tHKX2NBiI4nCXOaz4p8c9qwsVvipzXEW"
                },
                body: JSON.stringify(video_payload)
            }
        );

        const res = await response.json();
        console.log(res, "++66")

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

    },
);

export const functions = [generateVideo]
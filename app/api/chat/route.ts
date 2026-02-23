import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Convert messages (must await this)
    const modelMessages = await convertToModelMessages(messages);

    // 2. Call streamText WITHOUT await (it is now non-blocking)
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: modelMessages,
    });

    // 3. FIX: Use the updated 2026 method name
    // If your SDK is v5+, this is the standard method for useChat
    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
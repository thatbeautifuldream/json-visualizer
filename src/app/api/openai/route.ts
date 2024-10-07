import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

// Input schema
const InputSchema = z.object({
  apiKey: z.string().optional(),
  json: z.record(z.unknown()),
});

// Output schema
const ExplanationStep = z.object({
  explanation: z.string(),
  output: z.string(),
});

const JsonExplanationResponse = z.object({
  steps: z.array(ExplanationStep),
  summary: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { json, apiKey } = InputSchema.parse(body);

    const client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    const completion = await client.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that explains JSON structures. Provide a detailed, step-by-step explanation of the given JSON.",
        },
        {
          role: "user",
          content: `Explain this JSON structure: ${JSON.stringify(json)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: zodResponseFormat(
        JsonExplanationResponse,
        "jsonExplanation"
      ),
    });

    const message = completion.choices[0]?.message;
    if (message?.parsed) {
      return NextResponse.json(
        { status: true, data: message.parsed },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: message?.refusal || "Failed to parse the response.",
        },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("The sample encountered an error:", e);
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid input or output format.",
          errors: e.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
};

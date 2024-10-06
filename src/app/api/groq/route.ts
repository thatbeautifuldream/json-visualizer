import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Input schema
const InputSchema = z.object({
  apiKey: z.string().optional(),
  json: z.record(z.unknown()),
});

// Output schema
const ExplanationSchema = z.object({
  summary: z.string(),
  structure: z.object({
    type: z.string(),
    properties: z.record(z.string()),
  }),
  keyComponents: z.array(z.string()),
  potentialUse: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { json, apiKey } = InputSchema.parse(body);

    const client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    const response = await client.beta.chat.completions.parse({
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that explains JSON structures. Provide a detailed, structured explanation of the given JSON.",
        },
        {
          role: "user",
          content: `Explain this JSON structure: ${JSON.stringify(json)}`,
        },
      ],
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 4096,
      response_format: zodResponseFormat(ExplanationSchema, "explanation"),
    });

    const explanation = response.choices[0].message.parsed;

    return NextResponse.json(
      { status: true, data: explanation },
      { status: 200 }
    );
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

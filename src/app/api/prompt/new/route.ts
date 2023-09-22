import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      prompt,
      creator: userId,
      tag,
    });
    await newPrompt.save();
    return new NextResponse(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
    return new NextResponse("Failed to create new prompt", {
      status: 500,
    })
  }
}
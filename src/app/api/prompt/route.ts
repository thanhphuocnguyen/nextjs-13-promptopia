import { NextRequest, NextResponse } from 'next/server';
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return new NextResponse(JSON.stringify(prompts), { status: 200, });
  } catch (error) {
    return new NextResponse("Failed to get prompts", {
      status: 500
    })
  }
}
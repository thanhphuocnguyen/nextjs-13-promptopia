import { NextRequest, NextResponse } from 'next/server';
import Prompt from '@models/prompt';
export const GET = async (req: NextRequest) => {

  const text = req.nextUrl.searchParams.get("tag_search");
  try {
    const prompts = await Prompt.find({ tag: text }).populate('creator');
    return new NextResponse(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new NextResponse("Failed to get prompts", {
      status: 500
    })
  }
}
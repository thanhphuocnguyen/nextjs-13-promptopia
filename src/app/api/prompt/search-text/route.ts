import Prompt from '@models/prompt';
import { NextRequest, NextResponse } from 'next/server';
export const GET = async (req: NextRequest) => {
  const text = req.nextUrl.searchParams.get("search") ?? "";
  let query: any = {};

  if (text) {
    query.$text = { $search: text };
  }
  try {
    const prompts = await Prompt.find(query).populate('creator');
    return new NextResponse(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to get prompts", {
      status: 500
    })
  }
}
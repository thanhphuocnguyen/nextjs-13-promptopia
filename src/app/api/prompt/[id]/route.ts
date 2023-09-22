import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
export interface IParameters {
  params: { id: string }
}
export const GET = async (req: NextRequest, { params }: IParameters) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new NextResponse("Prompt not found", { status: 404 })
    return new NextResponse(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Prompt not found", {
      status: 500,
    })
  }
}

export const PATCH = async (req: NextRequest, { params }: IParameters) => {
  const promptUpdate = await req.json();
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id);

    if (!prompt) return new NextResponse("Prompt not found", { status: 404 });
    prompt.prompt = promptUpdate.prompt;
    prompt.tag = promptUpdate.tag;
    await prompt.save();
    return new NextResponse(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Failed to create new prompt", {
      status: 500,
    })
  }
}

export const DELETE = async (req: NextRequest, { params }: IParameters) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id);

    if (!prompt) return new NextResponse("Prompt not found", { status: 404 });
    await Prompt.deleteOne({ _id: params.id });
    return new NextResponse("success", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Failed to create new prompt", {
      status: 500,
    })
  }
}
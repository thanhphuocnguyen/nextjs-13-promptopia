import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    const err = {
      err: "internal server error",
      message: "Failed to get prompts"
    }
    return new Response(JSON.stringify(err), {
      status: 500
    });
  }
}